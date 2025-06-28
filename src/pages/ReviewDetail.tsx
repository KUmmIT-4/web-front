import { getReviewData } from '@/api/review';
import QuizLayout from '@/components/QuizLayout'; // 공통 레이아웃 컴포넌트 import
import type { Review } from '@/types/review/review';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// userAnswerList를 함수 최상단에서 선언
const userAnswerList = [1, 2, 3, 4]; // 서버에서 가져온 사용자 정답 데이터, mockup data
export default function ReviewDetail() {
  const navigate = useNavigate();
  const {quizNum} = useParams();
  const quizDescriptionRef = useRef<HTMLDivElement>(null);

  // 현재 서브 문제 인덱스 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 문제 전문 toggle 상태 관리
  const [isQuizDescriptionOpen, setIsQuizDescriptionOpen] = useState(true);

  const hasAnswered = userAnswerList[currentQuestionIndex] !== null;

  // 답변 선택 핸들러 - review페이지는 보기 전용이므로 동작 x
  const handleAnswerSelect = (selectedIndex: number, isCorrect: boolean) => {
    return { selectedIndex, isCorrect };
  };

  useEffect(() => {
    // 페이지 
    if (quizDescriptionRef.current) {
      quizDescriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  const reviewQuery = useQuery<Review, Error>({
    queryKey: ['review', quizNum],
    queryFn: () => getReviewData(parseInt(quizNum ?? '1')), // quizNum이 없을 경우 기본값 1 사용
  })

  // 퀴즈 완료 처리
  const handleComplete = () => {
    // 완료 시 복습 페이지로 돌아감
    navigate('/review');
  };

  return (
    <QuizLayout
      data={{
        problem_title: quizData.title,
        language: "cpp", // 임의의 값, 실제 데이터에 따라 변경
        tier: "SILVER", // 임의의 값, 실제 데이터에 따라 변경
        code: quizData.questions[currentQuestionIndex].question, // 임의의 값, 실제 데이터에 따라 변경
        level: "2", // 임의의 값, 실제 데이터에 따라 변경
        quiztext: quizData.questions[currentQuestionIndex].question,
        problem_explanation: quizData.quizDescription,
        choices: quizData.questions[currentQuestionIndex].answerOptions.map(option => option.text),
        answer_choice: userAnswerList[currentQuestionIndex],
        rationale: quizData.questions[currentQuestionIndex].answerOptions.map(option => option.rationale),
        problem_id: 1, // 임의의 값, 실제 데이터에 따라 변경
      }}
      isQuizDescriptionOpen={isQuizDescriptionOpen}
      onToggleDescription={() => setIsQuizDescriptionOpen(!isQuizDescriptionOpen)}
      quizDescriptionRef={quizDescriptionRef as React.RefObject<HTMLDivElement>}
      answerOptions={quizData.questions[currentQuestionIndex].answerOptions}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={userAnswerList[currentQuestionIndex]}
      onComplete={handleComplete}
      hasAnswered={hasAnswered}
      readonly={true}
      onBack={() => navigate(-1)}
    />
  );
};