import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Member } from "@/types/member";

// メンバー取得
export async function fetchMembers(userId: string): Promise<Member[]> {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("members")
    .select(
      `
      *
    `,
    )
    .eq("user_id", userId);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    userId: t.user_id,
  }));
}
