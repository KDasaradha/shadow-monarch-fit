"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Match this type with your Prisma User model
type User = {
  id: string;
  email: string;
  name?: string;
  level: number;
  xp: number;
  rank: string;
  strength: number;
  stamina: number;
  agility: number;
  intelligence: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { user }: { user: User } = await response.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { user }: { user: User } = await response.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } 
    finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  const authContextValue = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
