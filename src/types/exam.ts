export interface Option {
  id: string;
  textEn: string;
  textNp: string;
}

export interface Question {
  id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  subject: string;
  textEn: string;
  textNp: string;
  options: Option[];
  correctOptionId: string;
  note?: string;
}

export interface MarkingLogic {
  positive: number;
  negative: number;
}

export interface ExamMetadata {
  title: string;
  category: string;
  duration: number;
  marking: MarkingLogic;
}
