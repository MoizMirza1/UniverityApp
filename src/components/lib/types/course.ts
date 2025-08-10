import { BaseFields, BaseUser } from "./base";

export interface BaseCourse {
  title: string;
  description: string;
  image: string;
  duration: string;
  startDate: string;
  professorId: number;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

export interface Course extends BaseFields, BaseCourse {
  status?: 'draft' | 'published' | 'archived';
  studentsEnrolled: number;
  likes: number;
}
