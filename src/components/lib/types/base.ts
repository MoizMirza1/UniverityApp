export interface BaseFields {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}