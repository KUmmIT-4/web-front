import React from 'react';
import { ChevronLeft, User } from "lucide-react";
import { Link } from 'react-router-dom';
import CodeSection from '@/components/quiz/CodeSection';
import QuizDescription from '@/components/quiz/QuizDescription';
import QuizOptions from '@/components/quiz/QuizOptions';
import QuizNavigation from '@/components/quiz/QuizNavigation';

interface QuizLayoutProps {
  title: string;
  difficulty: string;
  quizDescription: string;
  isQuizDescriptionOpen: boolean;
  onToggleDescription: () => void;
  quizDescriptionRef: React.RefObject<HTMLDivElement>;
  currentQuestionIndex: number;
  totalQuestions: number;
  question: string;
  answerOptions: any[];
  onAnswerSelect: (selectedIndex: number, isCorrect: boolean) => void;
  selectedAnswer: number | null;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  hasAnswered: boolean;
  readonly?: boolean;
  onBack?: () => void;
}

// 공통 퀴즈 레이아웃 컴포넌트 생성
const QuizLayout: React.FC<QuizLayoutProps> = ({
  title,
  difficulty,
  quizDescription,
  isQuizDescriptionOpen,
  onToggleDescription,
  quizDescriptionRef,
  currentQuestionIndex,
  totalQuestions,
  question,
  answerOptions,
  onAnswerSelect,
  selectedAnswer,
  onPrevious,
  onNext,
  onComplete,
  hasAnswered,
  readonly = false,
  onBack
}) => {
  return (
    <>
      {/* 네비게이션 바 - 공통 */}
      <div className="flex justify-between mb-6">
        <button onClick={onBack} className='p-3 w-12'>
          <ChevronLeft />
        </button>
        <Link to='' className='p-3 w-12'>
          <User />
        </Link>
      </div>

      {/* 문제 제목과 난이도 - 공통 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <div className="text-sm text-gray-600">난이도: <span className="font-semibold">{difficulty}</span></div>
      </div>

      {/* 문제 전문 - 공통 */}
      <div ref={quizDescriptionRef}>
        <QuizDescription
          description={quizDescription}
          isOpen={isQuizDescriptionOpen}
          onToggle={onToggleDescription}
        />
      </div>

      {/* 현재 서브 문제 - 공통 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-6">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            문제 {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          {/* 문제 텍스트와 코드 분리 렌더링 */}
          <div className="text-lg font-medium text-gray-800 space-y-4">
            {question.split('```').map((part, index) => {
              if (index % 2 === 0) {
                // 일반 텍스트
                return part.trim() ? (
                  <div key={index} className="whitespace-pre-line">
                    {part.trim()}
                  </div>
                ) : null;
              } else {
                // 코드 블록
                return (
                  <CodeSection
                    key={index}
                    code={`\`\`\`${part}\`\`\``}
                    language="cpp"
                  />
                );
              }
            })}
          </div>
        </div>
        {/* 선택지 - 공통 */}
        <QuizOptions
          options={answerOptions}
          onAnswerSelect={onAnswerSelect}
          questionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          readonly={readonly}
        />
        {/* 네비게이션 버튼 - 공통 */}
        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onPrevious={onPrevious}
          onNext={onNext}
          onComplete={onComplete}
          hasAnswered={hasAnswered}
        />
      </div>
    </>
  );
};

export default QuizLayout;
