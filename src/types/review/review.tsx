export interface Review {
    attempt_id: number,
    problem_id: number,
    title: string,
    description: string,
    code: string,
    choices: string[],
    answer: number,
    answer_choice: number,
    pick: 1,
    attemptLanguage: string,
    status: string,
    level: string,
    rationale: string[],
    quizText: string
};