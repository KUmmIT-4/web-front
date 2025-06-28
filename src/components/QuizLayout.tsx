import React from 'react';
import { ChevronLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import CodeSection from '@/components/quiz/CodeSection';
import QuizDescription from '@/components/quiz/QuizDescription';
import QuizOptions from '@/components/quiz/QuizOptions';
import QuizNavigation from '@/components/quiz/QuizNavigation';
import { tierNames } from '@/lib/utils';
import type { Problem } from '@/types/quiz/quiz';

interface QuizLayoutProps {
  data: Problem;
  isQuizDescriptionOpen: boolean;
  onToggleDescription: () => void;
  quizDescriptionRef: React.RefObject<HTMLDivElement>;
  answerOptions: any[];
  onAnswerSelect: (selectedIndex: number, isCorrect: boolean) => void;
  selectedAnswer: number | null;
  onComplete: () => void;
  hasAnswered: boolean;
  readonly?: boolean;
  onBack?: () => void;
}

// 공통 퀴즈 레이아웃 컴포넌트 생성
export default function QuizLayout({
  data,
  isQuizDescriptionOpen,
  onToggleDescription,
  quizDescriptionRef,
  answerOptions,
  onAnswerSelect,
  selectedAnswer,
  onComplete,
  hasAnswered,
  readonly = false,
  onBack
}: QuizLayoutProps) {
  // master, data 객체에서 problem_title을 title이라는 이름으로 추출하고 있습니다.
  const { problem_title: title, language, tier, code, level, quiztext, problem_explanation } = data;

  console.log(quiztext);

  return (
    <>
      {/* 네비게이션 바 - 공통 */}
      <div className="flex justify-between">
        <button onClick={onBack} className='p-3 w-12'>
          <ChevronLeft />
        </button>
      </div>

      {/* 문제 제목과 난이도 - 공통 */}
      <div className="bg-white border-b border-gray-200 mb-[3px] flex flex-col items-start px-[10px] pb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-[9px]">{title}</h1>
        <div className='flex items-center gap-[9px]'>
          <div className="text-sm text-gray-600 px-1 bg-e8e9ec">언어: <span className="font-semibold">{language}</span></div>
          <div className="text-sm text-gray-600 px-1 bg-e8e9ec">난이도: <span className="font-semibold">{tierNames[tier]} {level}</span></div>
        </div>
      </div>

      <div className='px-[7px]'>

      {/* 문제 전문 - 공통 */}
        <div ref={quizDescriptionRef}>
        <QuizDescription
            description={problem_explanation}
          isOpen={isQuizDescriptionOpen}
          onToggle={onToggleDescription}
        />
      </div>

      {/* 현재 서브 문제 - 공통 */}
        <div className="bg-white rounded-lg shadow-sm mt-[9px]">
        <div className="mb-4">
          {/* <div className="text-sm text-gray-600 mb-2">
            문제 {currentQuestionIndex + 1} / {totalQuestions}
          </div> */}
          {/* 문제 텍스트와 코드 분리 렌더링 */}
            <div className="text-lg text-gray-800 space-y-4">
              <div className="whitespace-pre-line text-left">
                문제: {quiztext}
              </div>
              <CodeSection
                code={code}
                language="cpp"
              />
          </div>
        </div>
        {/* 선택지 - 공통 */}
        <QuizOptions
          options={answerOptions}
          onAnswerSelect={onAnswerSelect}
          // questionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          readonly={readonly}
        />
        {/* 네비게이션 버튼 - 공통 */}
        <QuizNavigation
          // currentIndex={currentQuestionIndex}
          // totalQuestions={totalQuestions}
          // onPrevious={onPrevious}
          // onNext={onNext}
          onComplete={onComplete}
          hasAnswered={hasAnswered}
        />
      </div>
      </div>
    </>
  );
};