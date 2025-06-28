import { useEffect, useState } from 'react';

interface AnswerOption {
  text: string;
  isCorrect: boolean;
  rationale: string;
}

interface QuizOptionsProps {
  options: AnswerOption[];
  onAnswerSelect: (selectedIndex: number, isCorrect: boolean) => void;
  questionIndex: number;
  selectedAnswer: number | null;
  readonly?: boolean; // 선택지 클릭 방지용
}

export default function QuizOptions({ 
  options, 
  onAnswerSelect, 
  questionIndex, 
  selectedAnswer,
  readonly,
}: QuizOptionsProps) {
  const [showResults, setShowResults] = useState(selectedAnswer !== null);

  // selectedAnswer가 변경될 때마다 showResults 상태 업데이트
  useEffect(() => {
    setShowResults(selectedAnswer !== null);
  }, [selectedAnswer]);

  const handleOptionClick = (index: number) => {
    if (selectedAnswer !== null || readonly) return; // 이미 답변한 경우 클릭 방지

    const isCorrect = options[index].isCorrect;
    setShowResults(true);
    onAnswerSelect(index, isCorrect);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const shouldShowAsCorrect = showResults && option.isCorrect;
        const shouldShowAsWrong = showResults && isSelected && !option.isCorrect;
        const shouldHighlight = showResults && (option.isCorrect || isSelected);

        return (
          <div
            key={index}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${!showResults ? 'hover:bg-blue-50 hover:border-blue-300' : ''}
              ${shouldShowAsCorrect ? 'border-green-500 bg-green-50' : ''}
              ${shouldShowAsWrong ? 'border-red-500 bg-red-50' : ''}
              ${!shouldHighlight && showResults ? 'opacity-60' : ''}
              ${isSelected && !showResults ? 'bg-blue-50 border-blue-300' : ''}
              ${!shouldHighlight && !isSelected ? 'border-gray-200' : ''}
            `}
            onClick={() => handleOptionClick(index)}
          >
            <div className="flex items-start space-x-3">
              {/* 라디오 버튼 */}
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0
                ${shouldShowAsCorrect ? 'border-green-500 bg-green-500' : ''}
                ${shouldShowAsWrong ? 'border-red-500 bg-red-500' : ''}
                ${isSelected && !showResults ? 'border-blue-500 bg-blue-500' : ''}
                ${!isSelected && !showResults ? 'border-gray-400' : ''}
              `}>
                {(isSelected || shouldShowAsCorrect) && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>

              {/* 선택지 텍스트와 해설 */}
              <div className="flex-1">
                <div className="text-gray-800 font-medium mb-2">
                  {option.text}
                </div>
                
                {/* 정답/오답 표시 */}
                {shouldShowAsCorrect && (
                  <div className="text-green-700 text-sm font-semibold mb-2">
                    ✓ 정답
                  </div>
                )}
                {shouldShowAsWrong && (
                  <div className="text-red-700 text-sm font-semibold mb-2">
                    ✗ 오답
                  </div>
                )}

                {/* 해설 표시 (정답이거나 선택된 오답인 경우) */}
                {showResults && shouldHighlight && (
                  <div className={`
                    text-sm p-3 rounded-md
                    ${shouldShowAsCorrect ? 'bg-green-100 text-green-800' : ''}
                    ${shouldShowAsWrong ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    <strong>해설:</strong> {option.rationale}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
