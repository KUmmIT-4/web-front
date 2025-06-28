import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useParams 추가
import QuizLayout from "@/components/QuizLayout";
import { useQuery } from "@tanstack/react-query";
import { getQuizData } from "@/api/quiz";
import type { Problem } from "@/types/quiz/quiz";

export default function Quiz() {
  const location = useLocation();
  const { tier, level, language } = location.state || {};

  const navigate = useNavigate();
  const quizDescriptionRef = useRef<HTMLDivElement>(null);

  // 현재 서브 문제 인덱스 상태 관리
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자 답변 상태 관리 (각 문제별 선택된 답변의 인덱스)
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  // 문제 전문 toggle 상태 관리
  const [isQuizDescriptionOpen, setIsQuizDescriptionOpen] = useState(true);

  // master, useQuery에서 queryFn에 quizNumNumber를 넘김
  const quizQuery = useQuery<Problem, Error>({
    queryKey: ["attempt"],
    queryFn: () => getQuizData(),
  });

  useEffect(() => {
    if (quizDescriptionRef.current) {
      quizDescriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (quizQuery.isLoading) {
    return <div>Loading...</div>;
  }
  console.log("Quiz data:", quizQuery.data);
  console.log("Quiz error:", quizQuery.error);
  if (quizQuery.isError) {
    return <div>Error: {quizQuery.error.message}</div>;
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
    const correctCount =
      userAnswer !== null && userAnswer === currentQuestion.answer_choice
        ? 1
        : 0;

    alert(
      `퀴즈가 완료되었습니다!\n총 1문제 중 ${correctCount}개 맞추셨습니다.`
    );
  };

  return (
    <QuizLayout
      title={quizQuery.data.problem_title}
      difficulty={quizQuery.data.tier}
      quizDescription={quizQuery.data.problem_explanation}
      isQuizDescriptionOpen={isQuizDescriptionOpen}
      onToggleDescription={() =>
        setIsQuizDescriptionOpen(!isQuizDescriptionOpen)
      }
      quizDescriptionRef={quizDescriptionRef as React.RefObject<HTMLDivElement>}
      // currentQuestionIndex={currentQuestionIndex}
      // totalQuestions={1} // 단일 문제
      question={quizQuery.data.quiztext}
      answerOptions={quizQuery.data.choices.map((choice, index) => ({
        text: choice,
        isCorrect: index === quizQuery.data.answer_choice,
        rationale: quizQuery.data.rationale[index] || "No rationale provided",
      }))}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={userAnswer}
      // onPrevious={handlePrevious}
      // onNext={handleNext}
      onComplete={handleComplete}
      hasAnswered={hasAnswered}
      readonly={false}
      onBack={() => navigate(-1)}
    />
  );
}
