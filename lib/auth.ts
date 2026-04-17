import { createServerSupabaseClient } from "@/lib/supabase-server";
import { User } from "@/types/auth";
import { redirect } from "next/navigation";

export async function requireAuth(): Promise<{ user: User }> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("認証失敗、ログインページにリダイレクト");
    redirect("/login");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
