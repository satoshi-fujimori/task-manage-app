"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { AuthContext, User } from "@/types/auth"
import { supabase } from "@/lib/supabase"

const AuthContext = createContext<AuthContext | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(
        data.user
          ? {
            id: data.user.id,
            email: data.user.email,
          }
          : null
      )
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(
            session?.user
                ? {
                    id: session.user.id,
                    email: session.user.email,
                }
                : null
        );
    })
    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return false;
    return true;
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return false;
    }
    return true;
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return false;
    return true;
  }, [])

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  //     </div>
  //   )
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
