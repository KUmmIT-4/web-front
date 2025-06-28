import QuizLayout from '@/components/QuizLayout'; // 공통 레이아웃 컴포넌트 import
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// userAnswerList를 함수 최상단에서 선언
const userAnswerList = [1, 2, 3, 4]; // 서버에서 가져온 사용자 정답 데이터, mockup data
export default function ReviewDetail() {
  const navigate = useNavigate();
  const {quizNum} = useParams();
  const quizDescriptionRef = useRef<HTMLDivElement>(null);

  // 현재 서브 문제 인덱스 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 문제 전문 toggle 상태 관리
  const [isQuizDescriptionOpen, setIsQuizDescriptionOpen] = useState(true);

  // 목업 퀴즈 데이터 (실제로는 서버에서 받아올 예정)
  const quizData = {
    title: "백준 1012번: 유기농 배추 C++ BFS 핵심 로직 퀴즈",
    difficulty: "실버 2",
    // 문제 전문 추가
    quizDescription: `농부 차뚜는 해외의 친구에게 유기농 배추를 수출하려고 한다. 세상에는 해충이 많아서 배추가 자라는 중에 해충이 침범하여 배추를 해칠 수 있다. 차뚜는 화학 살충제를 쓰고 싶지 않아서 지렁이를 구입하기로 했다.

지렁이는 배추근처에 서식하며 해충을 잡아먹음으로써 배추를 보호한다. 특히, 지렁이는 배추를 중심으로 상하좌우 네 방향으로 인접한 곳에 서식한다.

배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다.

예를 들어, 아래 그림에서 배추들이 5×3 크기의 밭에 심어져 있다. X표시는 배추가 심어진 곳이고, 빈칸은 배추가 심어지지 않은 곳이다.

X X X X X
X X   X X
X X X   X

이 경우에 상하좌우로 인접해있는 배추들이 총 2군데에 퍼져있으므로, 지렁이가 2마리 필요하다.

첫 줄에는 테스트 케이스의 개수 T가 주어진다. 그 다음 줄부터 각각의 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 세로길이 N(1 ≤ N ≤ 50), 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)이 주어진다. 그 다음 K줄에는 배추의 위치 X, Y가 주어진다. (0 ≤ X ≤ M-1, 0 ≤ Y ≤ N-1)

각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.`,
    questions: [
      {
        question: `백준 1012번 유기농 배추 문제를 C++ BFS로 풀이할 때, 인접한 칸을 탐색하기 위해 사용하는 자료구조는 무엇이며, 첫 시작점을 어떻게 추가하는가? 빈칸에 들어갈 알맞은 코드를 선택하세요.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <queue>

void bfs(int start_x, int start_y, int M, int N) {
    std::_______<std::pair<int, int>> q;
    q._______({start_x, start_y});
    visited[start_x][start_y] = true;
}
\`\`\``,

        answerOptions: [
          { text: "queue / push", isCorrect: true, rationale: "BFS는 큐(Queue) 자료구조를 사용하여 너비 우선으로 탐색하며, 큐에 요소를 추가할 때는 push 메소드를 사용합니다." },
          { text: "stack / push", isCorrect: false, rationale: "스택(Stack)은 깊이 우선 탐색(DFS)에 주로 사용되며, BFS에는 적합하지 않습니다." },
          { text: "vector / push_back", isCorrect: false, rationale: "벡터(Vector)는 동적 배열이며, 큐처럼 선입선출 구조를 직접 제공하지 않습니다." },
          { text: "list / emplace_back", isCorrect: false, rationale: "리스트(List)도 선입선출 구조를 직접 제공하지 않으며, BFS에는 큐가 적합합니다." }
        ]
      },
      {
        question: `BFS 로직에서 큐에서 현재 위치를 꺼내고 다음 위치를 탐색하는 핵심 반복문은?

\`\`\`cpp
while (___________) {
    int curr_x = q.front().first;
    int curr_y = q.front().second;
    q._______();
}
\`\`\``,

        answerOptions: [
          { text: "!q.empty() / pop", isCorrect: true, rationale: "BFS의 while 루프는 큐가 빌 때까지 반복하며, q.front()로 요소를 확인한 후 q.pop()으로 제거합니다." },
          { text: "q.size() > 0 / erase", isCorrect: false, rationale: "q.size() > 0은 유효하지만, 큐에서는 erase가 아닌 pop을 사용합니다." },
          { text: "q / remove", isCorrect: false, rationale: "큐 자체를 조건으로 사용할 수 없으며, remove는 큐의 표준 메소드가 아닙니다." },
          { text: "q.count() > 0 / delete", isCorrect: false, rationale: "count()는 큐의 메소드가 아니며, delete는 메모리 해제에 사용됩니다." }
        ]
      },
      {
        question: `상하좌우 인접한 칸을 탐색하는 조건문은?

\`\`\`cpp
if (_____________________________________) {
    // 다음 칸 처리
}
\`\`\``,

        answerOptions: [
          { text: "next_x >= 0 && next_x < M && next_y >= 0 && next_y < N && field[next_x][next_y] == 1 && !visited[next_x][next_y]", isCorrect: true, rationale: "범위 체크, 배추 존재 확인, 방문 여부 확인을 모두 포함한 완전한 조건입니다." },
          { text: "next_x >= 0 && next_x < M && next_y >= 0 && next_y < N", isCorrect: false, rationale: "범위만 확인하고 배추 존재나 방문 여부를 확인하지 않아 부정확합니다." },
          { text: "field[next_x][next_y] == 1 && !visited[next_x][next_y]", isCorrect: false, rationale: "범위 체크가 없어 배열 범위를 벗어날 수 있습니다." },
          { text: "visited[next_x][next_y] == false", isCorrect: false, rationale: "방문 여부만 확인하고 범위나 배추 존재를 확인하지 않습니다." }
        ]
      },
      {
        question: `main 함수에서 지렁이 개수를 세는 로직은?

\`\`\`cpp
for (int i = 0; i < M; ++i) {
    for (int j = 0; j < N; ++j) {
        if (_________________________) {
            bfs(i, j, M, N, field, visited);
            worm_count++;
        }
    }
}
\`\`\``,

        answerOptions: [
          { text: "field[i][j] == 1 && !visited[i][j]", isCorrect: true, rationale: "배추가 있고 아직 방문하지 않은 곳에서만 BFS를 시작하여 새로운 배추 군락을 찾습니다." },
          { text: "field[i][j] == 1", isCorrect: false, rationale: "이미 방문한 배추에 대해서도 중복으로 BFS를 호출할 수 있습니다." },
          { text: "!visited[i][j]", isCorrect: false, rationale: "배추가 없는 빈 칸에서도 BFS를 호출할 수 있습니다." },
          { text: "visited[i][j] == false", isCorrect: false, rationale: "!visited[i][j]와 같은 의미이며, 배추 존재 확인이 빠져있습니다." }
        ]
      }
    ]
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const hasAnswered = userAnswerList[currentQuestionIndex] !== null;

  // 답변 선택 핸들러 - review페이지는 보기 전용이므로 동작 x
  const handleAnswerSelect = (selectedIndex: number, isCorrect: boolean) => {
    return { selectedIndex, isCorrect };
  };

  // 이전 문제로 이동
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // 첫 번째 문제가 아니면 문제 설명을 접음
      setIsQuizDescriptionOpen(currentQuestionIndex - 1 === 0);
    }
  };

  // 다음 문제로 이동
  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // 첫 번째 문제가 아니면 문제 설명을 접음
      setIsQuizDescriptionOpen(currentQuestionIndex + 1 === 0);
    }
  };

  useEffect(() => {
    // 페이지 
    if (quizDescriptionRef.current) {
      quizDescriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  // 퀴즈 완료 처리
  const handleComplete = () => {
    // 완료 시 복습 페이지로 돌아감
    navigate('/review');
  };

  return (
    <QuizLayout
      title={quizData.title}
      difficulty={quizData.difficulty}
      quizDescription={quizData.quizDescription}
      isQuizDescriptionOpen={isQuizDescriptionOpen}
      onToggleDescription={() => setIsQuizDescriptionOpen(!isQuizDescriptionOpen)}
      quizDescriptionRef={quizDescriptionRef as React.RefObject<HTMLDivElement>}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={quizData.questions.length}
      question={currentQuestion.question}
      answerOptions={currentQuestion.answerOptions}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={userAnswerList[currentQuestionIndex]}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onComplete={handleComplete}
      hasAnswered={hasAnswered}
      readonly={true}
      onBack={() => navigate(-1)}
    />
  );
};