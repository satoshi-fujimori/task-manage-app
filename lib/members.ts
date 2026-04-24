import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Member, MemberCreateInput } from "@/types/member";

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
    icon: t.icon,
    userId: t.user_id,
    isUser: t.is_user,
  }));
}

// メンバー登録
export async function insertMember(member: MemberCreateInput): Promise<Member> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("members")
    .insert({
      name: member.name,
      icon: member.icon,
      user_id: member.userId,
      is_user: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// メンバー更新
export async function updateMemberById(member: Member): Promise<Member> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("members")
    .update({
      name: member.name,
      icon: member.icon,
    })
    .eq("id", member.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
