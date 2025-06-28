// master, 퀴즈 데이터 구조에 맞는 타입을 정의합니다.
export interface QuizAnswerOption {
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface QuizQuestion {
  question: string;
  answerOptions: QuizAnswerOption[];
}

export interface QuizData {
  quizNum: number;
  title: string;
  difficulty: string;
  quizDescription: string;
  questions: QuizQuestion[];
}

export interface QuizChoice {
  text: string;
}

export interface Problem {
  problem_id: number;
  tier: string;
  level: string;
  language: string;
  problem_title: string;
  problem_explanation: string;
  quiztext: string;
  code: string;
  choices: string[];
  answer_choice: number;
  rationale: string[];
}
