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
      <Content content="문제 설명" />

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
