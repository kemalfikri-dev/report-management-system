import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

async function getMe() {
  const res = await apiClient.get("/me");
  return res.data.userData;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkUser() {
    setIsLoading(true);
    try {
      setUser(await getMe());
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        setUser(await getMe());
      } catch (err) {
        if (isAxiosError<ApiErrorResponse>(err) && err.response) {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}
