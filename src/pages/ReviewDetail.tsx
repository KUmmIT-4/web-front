import { getReviewData } from '@/api/review';
import ReviewDetailLayout from '@/components/ReviewDetailLayout';
import type { Review } from '@/types/review/review';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect, useMemo } from 'react'; // master, useMemo import
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { quizNum } = useParams();
  const quizDescriptionRef = useRef<HTMLDivElement>(null);
  const [isQuizDescriptionOpen, setIsQuizDescriptionOpen] = useState(true);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false); // master, hasAnswered를 state로 관리

  const reviewQuery = useQuery<Review, Error>({
    queryKey: ['review', quizNum],
    queryFn: () => getReviewData(parseInt(quizNum ?? '1')),
  });

  useEffect(() => {
    if (quizDescriptionRef.current) {
      quizDescriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // master, hasAnswered 값을 설정하는 로직을 useEffect 훅 내부로 이동
  useEffect(() => {
    if (reviewQuery.data) {
      setHasAnswered(reviewQuery.data.pick !== null);
      if (reviewQuery.data.pick !== null) {
        setUserAnswer(reviewQuery.data.pick);
      }
    }
  }, [reviewQuery.data]);

  // master, answerOptions를 useMemo로 메모이제이션
  const answerOptions = useMemo(() => {
    if (reviewQuery.data) {
      return reviewQuery.data.choices.map((choice, index) => ({
        text: choice,
        isCorrect: index === reviewQuery.data.answer_choice,
        rationale: reviewQuery.data.rationale[index] || "No rationale provided",
      }));
    }
    return [];
  }, [reviewQuery.data]);

  // master, 로딩 상태에 따른 Skeleton UI 구현
  if (reviewQuery.isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex justify-between">
          <Skeleton width={48} height={48} />
        </div>
        <div className="bg-white border-b border-gray-200 mb-[3px] flex flex-col items-start px-[10px] pb-3">
          <Skeleton width="80%" height={32} className="mb-[9px]" />
          <div className='flex items-center gap-[9px]'>
            <Skeleton width={80} height={20} />
            <Skeleton width={120} height={20} />
          </div>
        </div>
        <div className='px-[7px]'>
          <div>
            <Skeleton height={48} />
          </div>
          <div className="bg-white rounded-lg mt-[9px]">
            <div className="mb-4">
              <Skeleton height={32} className="px-[14px]" />
              <Skeleton count={3} height={24} className="px-[14px]" />
              <Skeleton height={200} />
            </div>
            <div>
              {Array(4).fill(null).map((_, index) => (
                <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                  <Skeleton height={40} />
                </div>
              ))}
            </div>
            <div className='flex justify-end p-4'>
              <Skeleton width={100} height={36} />
            </div>
            <div className='pb-12'></div>
          </div>
        </div>
      </div>
    );
  }

  // master, 에러 발생 시 에러 메시지 표시 및 재시도 버튼 제공
  if (reviewQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl font-bold mb-4">
          Error: {reviewQuery.error.message}
        </div>
        <button
          onClick={() => reviewQuery.refetch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // master, 데이터가 없을 경우 메시지 표시
  if (!reviewQuery.data) {
    return <div>No review data found.</div>;
  }

  // master, ReviewDetail에서는 답변 선택 기능이 없으므로 빈 함수로 처리
  const handleAnswerSelect = (selectedIndex: number, _isCorrect: boolean) => {
    setUserAnswer(selectedIndex);
  };

  const handleComplete = () => {
    navigate('/review');
  };

  return (
    <ReviewDetailLayout
      data={reviewQuery.data}
      isQuizDescriptionOpen={isQuizDescriptionOpen}
      onToggleDescription={() => setIsQuizDescriptionOpen(!isQuizDescriptionOpen)}
      quizDescriptionRef={quizDescriptionRef as React.RefObject<HTMLDivElement>}
      answerOptions={answerOptions} // master, 메모이제이션된 answerOptions 전달
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={userAnswer}
      onComplete={handleComplete}
      hasAnswered={hasAnswered}
      readonly={true}
      onBack={() => navigate(-1)}
    />
  );
}