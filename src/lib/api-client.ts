import type { AuthTokens } from '../features/auth/types';
import { mockAuthResponse, mockPatients, mockVitals, mockTimeline, mockPredictions, mockSimulations } from './mock-data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true; // Default to true for demo

interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private tokens: AuthTokens | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadTokens();
  }

  private loadTokens(): void {
    const stored = localStorage.getItem('auth_tokens');
    if (stored) {
      try {
        this.tokens = JSON.parse(stored);
      } catch {
        localStorage.removeItem('auth_tokens');
      }
    }
  }

  public setTokens(tokens: AuthTokens | null): void {
    this.tokens = tokens;
    if (tokens) {
      localStorage.setItem('auth_tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('auth_tokens');
    }
  }

  public getTokens(): AuthTokens | null {
    return this.tokens;
  }

  private async mockRequest<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock responses for authentication
    if (endpoint === '/auth/login' && method === 'POST') {
      return mockAuthResponse as T;
    }
    if (endpoint === '/auth/refresh' && method === 'POST') {
      return mockAuthResponse as T;
    }
    if (endpoint === '/auth/me') {
      return mockAuthResponse.user as T;
    }
    if (endpoint === '/auth/logout' && method === 'POST') {
      return {} as T;
    }

    // Mock responses for patients
    if (endpoint === '/patients' && method === 'GET') {
      return mockPatients as T;
    }
    if (endpoint === '/patients' && method === 'POST') {
      return { ...(body as Record<string, unknown>), id: String(mockPatients.length + 1) } as T;
    }
    if (endpoint.match(/\/patients\/\d+$/) && method === 'GET') {
      return mockPatients[0] as T;
    }
    if (endpoint.match(/\/patients\/\d+$/) && method === 'PUT') {
      return { ...mockPatients[0], ...(body as Record<string, unknown>) } as T;
    }
    if (endpoint.match(/\/patients\/\d+$/) && method === 'DELETE') {
      return {} as T;
    }
    if (endpoint.includes('/vitals')) {
      return mockVitals as T;
    }
    if (endpoint.includes('/timeline')) {
      return mockTimeline as T;
    }

    // Mock responses for predictions
    if (endpoint.includes('/predictions') && method === 'GET') {
      return mockPredictions as T;
    }
    if (endpoint === '/predictions' && method === 'POST') {
      return { ...(body as Record<string, unknown>), id: String(mockPredictions.length + 1), timestamp: new Date().toISOString() } as T;
    }
    if (endpoint.match(/\/predictions\/\d+$/) && method === 'DELETE') {
      return {} as T;
    }

    // Mock responses for simulations
    if (endpoint.includes('/simulations') && method === 'GET') {
      return mockSimulations as T;
    }
    if (endpoint === '/simulations' && method === 'POST') {
      return { ...(body as Record<string, unknown>), id: String(mockSimulations.length + 1), createdAt: new Date().toISOString() } as T;
    }
    if (endpoint.match(/\/simulations\/\d+$/) && method === 'PUT') {
      return { ...mockSimulations[0], ...(body as Record<string, unknown>) } as T;
    }
    if (endpoint.match(/\/simulations\/\d+$/) && method === 'DELETE') {
      return {} as T;
    }
    if (endpoint.match(/\/simulations\/\d+\/run$/) && method === 'POST') {
      return { ...mockSimulations[0], status: 'running' } as T;
    }

    throw new Error(`Mock endpoint not found: ${method} ${endpoint}`);
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requireAuth = true, ...fetchConfig } = config;

    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      const bodyData = fetchConfig.body ? JSON.parse(fetchConfig.body as string) : undefined;
      return this.mockRequest<T>(endpoint, fetchConfig.method || 'GET', bodyData);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchConfig.headers as Record<string, string>),
    };

    if (requireAuth && this.tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${this.tokens.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchConfig,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 && requireAuth) {
        this.setTokens(null);
        window.location.href = '/login';
      }
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  public get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
