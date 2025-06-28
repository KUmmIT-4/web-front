import React from 'react'
import { ChevronLeft, User } from "lucide-react"; // chevron-left import
import { Link } from 'react-router-dom';
import Content from '@/components/problem/Content';
import CodeSection from '@/components/problem/CodeSection';

const Problem = () => {
  // 예시 코드 데이터 (실제로는 API나 props에서 받아올 예정)
  const sampleCode = `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 피보나치 수열의 10번째 값을 계산
const result = fibonacci(10);
console.log(result); // 55`;

  // 문제 설명 목업 데이터
  const problemDescription = `피보나치 수열은 첫 번째와 두 번째 항이 1이며, 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열입니다.

수열: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

주어진 코드에서 fibonacci(10)을 호출했을 때의 결과값을 구하시오.

조건:
• n은 0 이상 20 이하의 정수입니다
• 함수는 재귀적으로 구현되어 있습니다`;

  return (
    <>
      {/* navbar */}
      <div className="flex justify-between">
        {/* 뒤로가기 */}
        <Link to='' className='p-3 w-12'>
          <ChevronLeft />
        </Link>
        {/* 프로필 버튼 */}
        <Link to='' className='p-3 w-12'>
          <User />
        </Link>
      </div>

      {/* 문제 설명 */}
      <Content content={problemDescription} />

      {/* 코드 */}
      <CodeSection
        code={sampleCode}
        language="javascript"
        title="피보나치 수열 구현"
      />

      {/* 선택지 */}
    </>
  );
};

export default Problem;
