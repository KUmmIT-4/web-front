import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizNavigationProps {
  // currentIndex: number;
  // totalQuestions: number;
  // onPrevious: () => void;
  // onNext: () => void;
  onComplete: () => void;
  hasAnswered: boolean;
}

export default function QuizNavigation({
  // currentIndex,
  // totalQuestions,
  // onPrevious,
  // onNext,
  onComplete,
  hasAnswered
}: QuizNavigationProps) {
  // const isFirstQuestion = currentIndex === 0;
  // const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNextClick = () => {
    onComplete(); // 마지막 문제일 때 완료 함수 호출
    // if (isLastQuestion) {
    //   onComplete(); // 마지막 문제일 때 완료 함수 호출
    // } else {
    //   onNext(); // 다음 문제로 이동
    // }
  };

  return (
    <div className="flex justify-between items-center mt-7">
      {/* 이전 버튼 */}
      {/* <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
          ${isFirstQuestion
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        <ChevronLeft size={20} />
        <span>이전</span>
      </button> */}

      {/* 진행 상황 표시 */}
      {/* <div className="text-sm text-gray-600">
        <span className="font-semibold">{currentIndex + 1}</span>
        <span> / {totalQuestions}</span>
      </div> */}

      {/* 다음/완료 버튼 */}
      <button
        onClick={handleNextClick}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-200 w-full h-14
          ${hasAnswered
          ? 'bg-[#2D8EFF] text-white hover:bg-blue-600' // 배경색을 #2D8EFF로 변경
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
        disabled={!hasAnswered}
      >
        <span className='block w-full font-bold text-lg'>완료</span> {/* 폰트 스타일 변경 */}
      </button>
    </div>
  );
}
