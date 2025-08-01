import { GetUser, Login, Logout } from "@/services/api";
import { router } from "expo-router";
import React, { createContext } from "react";
import { Alert } from "react-native";
import { useFetch } from "./useFetch";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
  LogOut: () => Promise<void>;
  LogIn: () => Promise<void>;
}
const context = createContext<GlobalContextType | undefined>(undefined);
const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, error, refetch, reset } = useFetch(GetUser);

  const user: User | null = data
    ? {
        id: data.$id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      }
    : null;

  const isLoggedIn = !!user;

  async function LogOut() {
    try {
      await Logout();
      reset();
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Logout Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  async function LogIn() {
    if (data) {
      router.replace("/");
      return;
    }
    try {
      const res = await Login();
      await refetch();

      if (res) {
        router.replace("/");
      }
    } catch (error) {
      Alert.alert(
        "Login Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      return;
    }
  }

  
  return (
    <context.Provider
      value={{ isLoggedIn, user, loading, refetch, LogOut, LogIn }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalProvider;

export const useAuth = (): GlobalContextType => {
  const contextValue = React.useContext(context);
  if (!contextValue) {
    throw new Error("useAuth must be used within a GlobalProvider");
  }
  return contextValue;
};
