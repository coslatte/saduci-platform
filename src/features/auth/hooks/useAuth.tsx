import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import type { User, LoginCredentials } from "../types";
import { authService } from "../services/auth.service";
import { apiClient } from "../../../lib/api-client";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const tokens = apiClient.getTokens();
      if (tokens?.accessToken) {
        try {
          const decoded = jwtDecode(tokens.accessToken);
          const isExpired = decoded.exp
            ? decoded.exp * 1000 < Date.now()
            : true;

          if (!isExpired) {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser as User);
          } else {
            apiClient.setTokens(null);
          }
        } catch {
          apiClient.setTokens(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    navigate("/patients");
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
