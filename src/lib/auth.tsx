"use client";

import {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Role } from "@/lib/types";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isActive?: boolean;
  isSuperuser?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const TOKEN_STORAGE_KEY = "saduci_token";
const USER_STORAGE_KEY = "saduci_user";

type BackendUser = {
  id: number | string;
  username: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
};

type AuthResponse = {
  access_token: string;
  user: BackendUser;
};

function formatDisplayName(identifier: string): string {
  const base = identifier
    .split(/[@._-]+/)
    .filter(Boolean)
    .join(" ");

  return base.replace(/\b\w/g, (char) => char.toUpperCase()) || identifier;
}

function mapBackendUser(user: BackendUser): User {
  const isAdmin = !!user.is_superuser;

  return {
    id: String(user.id),
    username: user.username,
    name: formatDisplayName(user.username),
    email: user.email,
    role: isAdmin ? "Administrador" : "Analista",
    isActive: user.is_active ?? true,
    isSuperuser: isAdmin,
  };
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidate = record.detail ?? record.error ?? record.message;
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const hydrateSession = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = safeJsonParse<User>(
      localStorage.getItem(USER_STORAGE_KEY),
    );

    if (!storedToken) {
      clearSession();
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const backendUser = (await response.json()) as BackendUser;
      const nextUser = mapBackendUser(backendUser);

      setToken(storedToken);
      setUser(nextUser);
      localStorage.setItem(TOKEN_STORAGE_KEY, storedToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      if (storedUser) {
        // Drop stale cached data quietly and force a clean login state.
        localStorage.removeItem(USER_STORAGE_KEY);
      }
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    void hydrateSession();
  }, [hydrateSession]);

  const login = useCallback(async (identifier: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: identifier, password }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        extractErrorMessage(payload, "No se pudo iniciar sesión."),
      );
    }

    const authResponse = payload as AuthResponse | null;
    if (!authResponse?.access_token || !authResponse.user) {
      throw new Error("La respuesta de autenticación no es válida.");
    }

    const nextUser = mapBackendUser(authResponse.user);

    setToken(authResponse.access_token);
    setUser(nextUser);
    localStorage.setItem(TOKEN_STORAGE_KEY, authResponse.access_token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
