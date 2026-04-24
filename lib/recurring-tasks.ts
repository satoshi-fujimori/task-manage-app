import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  RecurringTask,
  RecurringTaskCreateInput,
} from "@/types/recurring-task";
import { Task, TaskCreateInput } from "@/types/task";

// タスク取得
export async function fetchRecurringTasks(
  userId: string,
): Promise<RecurringTask[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("recurring_tasks")
    .select(
      `
      *,
      members!inner (
        user_id,
        id
      )
    `,
    )
    .eq("members.user_id", userId)
    .neq("delete_flg", true);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    info: t.info,
    priority: t.priority,
    memberId: t.members.id,
  }));
}

// タスク作成
export async function insertRecurringTask(
  task: RecurringTaskCreateInput,
): Promise<string> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("recurring_tasks")
    .insert({
      title: task.title,
      info: task.info,
      priority: task.priority,
      member_id: task.memberId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data.id;
}

// タスク更新
export async function updateRecurringTaskById(task: RecurringTask) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("recurring_tasks")
    .update({
      title: task.title,
      info: task.info,
      priority: task.priority,
      member_id: task.memberId,
    })
    .eq("id", task.id);

  if (error) {
    throw new Error(error.message);
  }
}

// 削除（論理削除）
export async function deleteRecurringTaskById(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("recurring_tasks")
    .update({ delete_flg: true })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
