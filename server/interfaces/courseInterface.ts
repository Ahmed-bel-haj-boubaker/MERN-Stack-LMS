export interface iAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export interface iAddAnswerData {
  questionId: string;
  courseId: string;
  contentId: string;
  answer: string;
}

export interface IAddReviewData {
  review: string;
  rating: string;
  userId: string;
}
