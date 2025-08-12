export interface BaseFields {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}