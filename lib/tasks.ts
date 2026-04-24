import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Task, TaskCreateInput, TaskRecord } from "@/types/task";
import { fetchRecurringTasks } from "./recurring-tasks";

// タスク取得
export async function fetchTasks(
  userId: string,
  displayDate: string,
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
    .eq("members.user_id", userId);

  if (displayDate) {
    query = query.eq("limit_date", displayDate);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  let tasks = (data ?? []).map((t: TaskRecord) => toTask(t));

  tasks = [
    ...tasks,
    ...(await insertUnregisteredRecurringTasks(userId, displayDate, tasks)),
  ];
  return tasks.filter((task) => !task.deleteFlg);
}

// タスク作成
export async function insertTask(task: TaskCreateInput) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: task.title,
      info: task.info,
      limit_date: task.limitDate,
      priority: task.priority,
      member_id: task.memberId,
      recurring_task_id: task.recurringTaskId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return toTask(data);
}

// 複数タスク作成
export async function insertTasks(tasks: TaskCreateInput[]) {
  const supabase = await createServerSupabaseClient();

  const inserts = tasks.map((task) => ({
    title: task.title,
    info: task.info,
    limit_date: task.limitDate,
    priority: task.priority,
    member_id: task.memberId,
    recurring_task_id: task.recurringTaskId,
  }));

  const { data, error } = await supabase.from("tasks").insert(inserts).select();

  if (error) {
    throw new Error(error.message);
  }
  return data.map(toTask);
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

// 定期タスクid更新
export async function updateRecurringTaskIdInDB(
  id: string,
  recurringTaskId: string,
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("tasks")
    .update({ "recurring-task-id": recurringTaskId })
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
    .update({ delete_flg: true })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

// 未登録定期タスク追加
async function insertUnregisteredRecurringTasks(
  userId: string,
  displayDate: string,
  tasks: Task[],
) {
  const recurringTasks = await fetchRecurringTasks(userId);
  const unRegisteredTasks: TaskCreateInput[] = recurringTasks
    .filter((r) => !tasks.some((t) => t.recurringTaskId === r.id))
    .map((r) => ({
      title: r.title,
      info: r.info,
      limitDate: displayDate,
      priority: r.priority,
      completed: false,
      memberId: r.memberId,
      recurringTaskId: r.id,
      deleteFlg: false,
    }));
  return insertTasks(unRegisteredTasks);
}

// DB型からアプリ型へ返還
function toTask(task: TaskRecord): Task {
  return {
    id: task.id,
    title: task.title,
    info: task.info,
    limitDate: task.limit_date,
    priority: task.priority,
    completed: task.completed,
    memberId: task.member_id,
    recurringTaskId: task.recurring_task_id,
    deleteFlg: task.delete_flg,
  };
}
