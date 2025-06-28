interface ProblemDescriptionProps {
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProblemDescription({ 
  description, 
  isOpen, 
  onToggle 
}: ProblemDescriptionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">문제 설명</h2>
          <span className="text-gray-500">
            {isOpen ? '접기' : '펼치기'}
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}
