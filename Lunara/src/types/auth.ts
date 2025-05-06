export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  dueDate?: string;
  birthDate?: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dueDate?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
} 