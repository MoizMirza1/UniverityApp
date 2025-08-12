import { BaseFields, BaseUser } from "./base";

export interface BaseCourse {
  title: string;
  description: string;
  image: string;
  duration: string;
  startDate: string;
  professor: string;
  category?: string;
  date?:string
  level?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

export interface Course extends BaseFields, BaseCourse {
  status?: 'draft' | 'published' | 'archived';
  students: [];
  likes: string;
}
