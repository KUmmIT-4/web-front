import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizLayout from "@/components/QuizLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQuizData } from "@/api/quiz";
import submitQuizAnswer from "@/api/quiz";
import type { Problem, QuizParams } from "@/types/quiz/quiz";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { UserInfo } from "@/types/user/user";

export default function Quiz() {
  const location = useLocation();
  const { tier, level, language } = location.state || {};

  const navigate = useNavigate();
  // quizParams - 티어, 레벨, 언어 설정 / quiz컴포넌트 navigate시 state로 전달.
  const quizParams = location.state as QuizParams ?? {
    tier: 'BRONZE', // 기본값 설정
    level: 1,       // 기본값 설정
    language: 'CPP'  // 기본값 설정
  };
  const quizDescriptionRef = useRef<HTMLDivElement>(null);

  // 현재 서브 문제 인덱스 상태 관리
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자 답변 상태 관리 (각 문제별 선택된 답변의 인덱스)
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  // 문제 전문 toggle 상태 관리
  const [isQuizDescriptionOpen, setIsQuizDescriptionOpen] = useState(true);

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // master, 사용자 정보를 가져오는 API 호출
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함 설정
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data as UserInfo;
    },
  })


  // master, useQuery에서 queryFn에 quizNumNumber를 넘김
  const quizQuery = useQuery<Problem, Error>({
    queryKey: ['attempt', quizParams],
    queryFn: () => getQuizData(quizParams),
  });

  // master, useMutation 훅을 사용하여 퀴즈 답변 제출
  const submitAnswerMutation = useMutation(
    () => submitQuizAnswer(quizQuery.data.problem_id, userAnswer ?? 0, userQuery.data.userId), // userQuery에서 userId를 가져옴
    {
      onSuccess: () => {
        // master, 성공적으로 제출한 후 로직 (예: 알림)
        console.log("Answer submitted successfully!");
      },
      onError: (error) => {
        // master, 오류 처리 로직 (예: 오류 메시지 표시)
        console.error("Failed to submit answer:", error);
      },
    }
  );

  useEffect(() => {
    if (quizDescriptionRef.current) {
      quizDescriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (quizQuery.isLoading) {
    return (
      <div className="animate-pulse"> {/* 로딩 중 shimmer 효과를 위한 감싸는 div */}
        <div className="flex justify-between">
          <Skeleton width={48} height={48} /> {/* 뒤로가기 버튼 대체 */}
        </div>
        <div className="bg-white border-b border-gray-200 mb-[3px] flex flex-col items-start px-[10px] pb-3">
          <Skeleton width="80%" height={32} className="mb-[9px]" /> {/* 문제 제목 대체 */}
          <div className='flex items-center gap-[9px]'>
            <Skeleton width={80} height={20} /> {/* 언어 대체 */}
            <Skeleton width={120} height={20} /> {/* 난이도 대체 */}
          </div>
        </div>
        <div className='px-[7px]'>
          <div>
            <Skeleton height={48} /> {/* 문제 설명 버튼 대체 */}
          </div>
          <div className="bg-white rounded-lg mt-[9px]">
            <div className="mb-4">
              <Skeleton height={32} className="px-[14px]" /> {/* "문제" 제목 대체 */}
              <Skeleton count={3} height={24} className="px-[14px]" /> {/* 문제 텍스트 대체 */}
              <Skeleton height={200} /> {/* 코드 섹션 대체 */}
            </div>
            <div>
              {Array(4).fill(null).map((_, index) => (
                <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                  <Skeleton height={40} /> {/* 선택지 대체 */}
                </div>
              ))}
            </div>
            <div className='flex justify-end p-4'>
              <Skeleton width={100} height={36} /> {/* 완료 버튼 대체 */}
            </div>
            <div className='pb-12'></div>
          </div>
        </div>
      </div>
    );
  }

  if (quizQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl font-bold mb-4">
          Error: {quizQuery.error.message}
        </div>
        <button
          onClick={() => quizQuery.refetch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!quizQuery.data) {
    return <div>No quiz data found.</div>;
  }

  const hasAnswered = userAnswer !== null;

  // 답변 선택 핸들러
  const handleAnswerSelect = (selectedIndex: number, _isCorrect: boolean) => {
    setUserAnswer(selectedIndex);
    submitAnswerMutation.mutate(); // master, 선택한 답변 제출
  };

  // 퀴즈 완료 처리
  const handleComplete = () => {
    if (userAnswer !== null) {
      // master, 답변을 선택한 경우에만 제출
      navigate('/home');
    } else {
      // master, 답변을 선택하지 않은 경우 알림
      alert("Please select an answer before completing the quiz.");
    }
  };

  return (
    <QuizLayout
      data={quizQuery.data}
      isQuizDescriptionOpen={isQuizDescriptionOpen}
      onToggleDescription={() =>
        setIsQuizDescriptionOpen(!isQuizDescriptionOpen)
      }
      quizDescriptionRef={quizDescriptionRef as React.RefObject<HTMLDivElement>}
      answerOptions={quizQuery.data.choices.map((choice, index) => ({
        text: choice,
        isCorrect: index === quizQuery.data.answer_choice,
        rationale: quizQuery.data.rationale[index] || "No rationale provided",
      }))}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={userAnswer}
      onComplete={handleComplete}
      hasAnswered={hasAnswered}
      readonly={false}
      onBack={() => navigate(-1)}
    />
  );
}
