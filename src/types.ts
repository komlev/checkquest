export interface Question {
  id: string;
  text: string;
  score: number;
  checked?: boolean;
  extra?: boolean;
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export interface Checklist {
  id: string;
  name: string;
  description?: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  name: string;
  checklistId: string;
  summary?: string;
  sections: Section[];
  score: number;
  createdAt: string;
  updatedAt: string;
}
