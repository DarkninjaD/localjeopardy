interface JeopardyQuestion {
  questions: string;
  answer: string;
  score: string;
  category: string;
}

interface JeopardyCategoryQuestion {
  category: string;
  questions: JeopardyQuestion[];
}
