import React from 'react'
import { ChevronLeft, User } from "lucide-react"; // chevron-left import
import { Link } from 'react-router-dom';

const Problem = () => {
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

      {/* 코드 */}

      {/* 선택지 */}
    </>
  );
};

export default Problem;
