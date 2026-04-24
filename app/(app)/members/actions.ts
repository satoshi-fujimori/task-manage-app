"use server";

import { insertMember, updateMemberById } from "@/lib/members";
import { Member, MemberCreateInput } from "@/types/member";
import { revalidatePath } from "next/cache";

// メンバー作成
export async function createMember(member: MemberCreateInput) {
  const createdMember = await insertMember(member);
  revalidatePath("/recurring-tasks");
  return createdMember;
}

// メンバー更新
export async function updateMember(member: Member) {
  const updatedMember = await updateMemberById(member);
  revalidatePath("/recurring-tasks");
  return updatedMember;
}
