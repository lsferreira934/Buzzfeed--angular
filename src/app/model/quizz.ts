export type results = {
  A: string;
  B: string;
};

export type options = {
  id: number;
  name: string;
  alias: string;
  selected?: boolean;
};

export type questions = {
  id: 1;
  question: string;
  options: options[];
};

export type quizz = {
  title: string;
  questions: questions[];
  results: results;
};
