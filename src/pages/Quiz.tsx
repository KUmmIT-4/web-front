import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizLayout from "@/components/QuizLayout";
import { useQuery } from "@tanstack/react-query";
import { getQuizData } from "@/api/quiz";
import type { Problem, QuizParams } from "@/types/quiz/quiz";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  // master, useQuery에서 queryFn에 quizNumNumber를 넘김
  const quizQuery = useQuery<Problem, Error>({
    queryKey: ['attempt', quizParams],
    queryFn: () => getQuizData(quizParams),
  });

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

  const currentQuestion = quizQuery.data;
  const hasAnswered = userAnswer !== null;

  // 답변 선택 핸들러
  // _isCorrect는 QuizOptions prop 시그니처를 맞추기 위해 남겨둠, 미사용 경고는 무시해도 무방함
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAnswerSelect = (selectedIndex: number, _isCorrect: boolean) => {
    setUserAnswer(selectedIndex);
  };

  // 이전 문제로 이동
  // const handlePrevious = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //     setIsQuizDescriptionOpen(currentQuestionIndex - 1 === 0);
  //   }
  // };

  // 다음 문제로 이동
  // const handleNext = () => {
  //   // questions이 없고, 퀴즈는 단일 문제로 변경되었으므로 다음 문제로 가는 로직 삭제
  //   // setIsQuizDescriptionOpen(currentQuestionIndex + 1 === 0);
  // };

  // 퀴즈 완료 처리
  const handleComplete = () => {
    // const correctCount = userAnswer !== null && userAnswer === currentQuestion.answer_choice ? 1 : 0;

    // alert(
    //   `퀴즈가 완료되었습니다!\n총 1문제 중 ${correctCount}개 맞추셨습니다.`
    // );
    navigate('/home');
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
