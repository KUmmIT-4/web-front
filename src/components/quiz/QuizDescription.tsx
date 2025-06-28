interface QuizDescriptionProps {
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function QuizDescription({ 
  description, 
  isOpen, 
  onToggle 
}: QuizDescriptionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-[9px]">
      <button
        onClick={onToggle}
        className="w-full px-[14px] py-[10px] text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex justify-between items-center h-[34px]">
          <h2 className="text-lg font-semibold text-gray-800">문제 설명</h2>
          <span className="text-gray-500">
            {isOpen ? '접기' : '펼치기'}
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="px-[14px] py-[6px] pb-[10px] text-[#6D7582] leading-relaxed whitespace-pre-line font-semibold text-[14px]">
          {description}
        </div>
      )}
    </div>
  );
}
