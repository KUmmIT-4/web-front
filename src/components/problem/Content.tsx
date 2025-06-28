interface ContentProps{
  content: string; // 문제 설명 텍스트
  title?: string; // 제목을 선택적으로 받음
};

export default function Content({ content, title = "문제 설명" }: ContentProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
      {/* 문제 제목 */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      {/* 문제 내용 */}
      <div className="text-gray-700 leading-relaxed space-y-4 text-left"> {/* text-left 클래스 추가 */}
        {/* content를 줄바꿈 기준으로 나누어 렌더링 */}
        {content.split('\n').map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}