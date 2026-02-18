export interface User {
  id: string;
  username: string;
  email: string;
  role: "doctor" | "nurse" | "admin";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
