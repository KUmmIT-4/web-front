import type { Problem, QuizParams } from "@/types/quiz/quiz"; // Problem 타입 import

const API_URL = import.meta.env.VITE_API_URL; // 환경 변수에서 API URL 가져오기

/**
 * 특정 문제 데이터 가져옴
 * @param {number} probNum - 문제 번호
 * @returns {Promise<Problem>} - 문제 데이터
 */
export const getQuizData = async (quizParams: QuizParams): Promise<Problem> => {
  const response = await fetch(`${API_URL}/api/attempts`, {
    method: "POST", // HTTP 메소드를 POST로 변경
    headers: {
      // HTTP 헤더 설정
      session_id: "12345", // session_id를 헤더에 추가 (임의의 session_id)
      "Content-Type": "application/json", // Content-Type 설정 (JSON 형태)
    },
    credentials: "include", //쿠키 포함 설정
    body: JSON.stringify({ ...quizParams, tier: quizParams.tier.toUpperCase() }), // body에 JSON 객체 추가
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as Problem; // Problem 타입 단언
};

/**
 * 사용자 답 선정 및 제출 api
 */
export default async function submitQuizAnswer(
  quizNum: number,
  pick: number,
  userId: number, // 사용자 ID 추가
): Promise<void> {
  const response = await fetch(`${API_URL}/api/attempts/${quizNum}`, {
    method: "PATCH",
    headers: {
      session_id: "12345",
      "Content-Type": "application/json",
    },
    credentials: "include", //쿠키 포함 설정
    body: JSON.stringify({
      pick: pick,
      userId: userId 
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit quiz answer");
  }
}