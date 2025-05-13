import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AdminLoginData } from "@shared/schema";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (data: AdminLoginData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const loginMutation = useMutation({
    mutationFn: async (data: AdminLoginData) => {
      const res = await apiRequest("POST", "/api/admin/login", data);
      return await res.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Giriş başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const login = async (data: AdminLoginData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      // Error is handled in onError callback
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading: loginMutation.isPending,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
