"use client";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  serverTokens,
}: {
  children: React.ReactNode;
  serverTokens: { accessToken: string | null; refreshToken: string | null };
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    serverTokens.accessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    serverTokens.refreshToken
  );

  const setAuthTokens = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, setAuthTokens, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
