import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 다크 테마 CSS
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // 줄 번호 CSS 추가
import 'prismjs/plugins/line-numbers/prism-line-numbers'; // 줄 번호 플러그인 추가
// 의존성 순서에 맞게 import (기본 언어들을 먼저 로드)
import 'prismjs/components/prism-clike'; // C-like 언어 기본 (C++의 의존성)
import 'prismjs/components/prism-javascript'; // JavaScript 언어 지원
import 'prismjs/components/prism-typescript'; // TypeScript 언어 지원 (JS 의존)
import 'prismjs/components/prism-python'; // Python 언어 지원
import 'prismjs/components/prism-java'; // Java 언어 지원 (clike 의존)
import 'prismjs/components/prism-c'; // C 언어 지원 (clike 의존)
import 'prismjs/components/prism-cpp'; // C++ 언어 지원 (c 의존)

interface CodeSectionProps {
  code: string; // 렌더링할 코드 문자열
  language?: string; // 코드 언어 (기본값: javascript)
  title?: string; // 코드 블록 제목 (선택사항)
}

export default function CodeSection({ 
  code, 
  language = 'javascript', 
  title 
}: CodeSectionProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 코드가 변경될 때 Prism으로 하이라이팅 수행
    if (codeRef.current) {
      // line-numbers 플러그인을 수동으로 활성화
      codeRef.current.parentElement?.classList.add('line-numbers');
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* 코드 블록 헤더 (제목이 있을 경우) */}
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <h3 className="text-gray-200 font-medium text-sm">{title}</h3>
        </div>
      )}
      
      {/* 코드 블록 본문 */}
      <div className="relative">
        <pre className="overflow-x-auto p-0 m-0 line-numbers text-left"> {/* padding 제거, text-left 추가 */}
          <code 
            ref={codeRef}
            className={`language-${language} block p-4`} /* block과 padding을 code에 적용 */
          >
            {code}
          </code>
        </pre>
        
        {/* 언어 표시 라벨 */}
        <div className="absolute top-2 right-2 bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
          {language.toUpperCase()}
        </div>
      </div>
    </div>
  );
}