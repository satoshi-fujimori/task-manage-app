import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Task, TaskCreateInput } from "@/types/task";

// タスク取得
export async function fetchTasks(
  userId: string,
  displayDate?: string,
): Promise<Task[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("tasks")
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

  if (displayDate) {
    query = query.eq("limit_date", displayDate);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    info: t.info,
    limitDate: t.limit_date,
    priority: t.priority,
    completed: t.completed,
    memberId: t.members.id,
  }));
}

// タスク作成
export async function insertTask(task: TaskCreateInput) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("tasks").insert({
    title: task.title,
    info: task.info,
    limit_date: task.limitDate,
    priority: task.priority,
    completed: task.completed,
    member_id: task.memberId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

// タスク更新
export async function updateTaskById(task: Task) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      info: task.info,
      limit_date: task.limitDate,
      priority: task.priority,
      completed: task.completed,
      member_id: task.memberId,
    })
    .eq("id", task.id);

  if (error) {
    throw new Error(error.message);
  }
}

// 完了状態更新
export async function toggleTaskById(id: string, completed: boolean) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("tasks")
    .update({ completed: !completed })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

// 削除（論理削除）
export async function deleteTaskById(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("tasks")
    .update({ delete_flg: true }) // ←ここ修正（元コードバグ）
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
