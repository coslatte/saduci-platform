import { apiClient } from '../../../lib/api-client';
import type { AuthResponse, LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials, {
      requireAuth: false,
    });
    apiClient.setTokens(response.tokens);
    return response;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.setTokens(null);
    }
  },

  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },
};
