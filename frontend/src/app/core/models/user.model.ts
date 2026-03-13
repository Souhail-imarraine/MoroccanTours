import { LanguageResponse } from './language.model';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: boolean;
  phone?: string;
  profileImage?: string;
  city?: string;
  bio?: string;
  languages?: LanguageResponse[];
  yearsOfExperience?: number;
  createdAt?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
