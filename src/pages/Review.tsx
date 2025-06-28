// import React from 'react'
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 추가
import codeIcon from "@/assets/images/codeIcon.png";
import nextArrow from "@/assets/images/next-arrow.png";
import person from "@/assets/images/person.svg";

const Review = () => {
  const navigate = useNavigate(); // navigate 함수 생성

  // 문제 카드 클릭 시 /review/193으로 이동하는 핸들러
  const handleCardClick = () => {
    navigate("/review/193");
  };

  return (
    <div className="pt-12 pl-6 pr-6">
      <div>
        <div className="flex items-center justify-between px-4">
          <p className="mb-4 font-bold text-2xl text-start text-blue-400">
            하루코딩
          </p>
          <img src={person}></img>
        </div>
        <div className="flex flex-col gap-3.5">
          <div
            className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors" // 클릭 가능한 스타일 추가
            onClick={handleCardClick} // 클릭 이벤트 핸들러 추가
          >
            <img src={codeIcon} className="size-11" />
            <div className="flex flex-col">
              <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
              <p className="text-start text-[#505866]">
                난이도 : 실버 2 언어 : C++
              </p>
            </div>

            <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
          </div>

          <div
            className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors" // 클릭 가능한 스타일 추가
            onClick={handleCardClick} // 클릭 이벤트 핸들러 추가
          >
            <img src={codeIcon} className="size-11" />
            <div className="flex flex-col">
              <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
              <p className="text-start text-[#505866]">
                난이도 : 실버 2 언어 : C++
              </p>
            </div>

            <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
          </div>

          <div
            className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors" // 클릭 가능한 스타일 추가
            onClick={handleCardClick} // 클릭 이벤트 핸들러 추가
          >
            <img src={codeIcon} className="size-11" />
            <div className="flex flex-col">
              <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
              <p className="text-start text-[#505866]">
                난이도 : 실버 2 언어 : C++
              </p>
            </div>

            <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
