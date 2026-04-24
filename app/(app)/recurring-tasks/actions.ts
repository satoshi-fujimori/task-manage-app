"use server";

import { revalidatePath } from "next/cache";
import {
  insertRecurringTask,
  updateRecurringTaskById,
  deleteRecurringTaskById,
} from "@/lib/recurring-tasks";
import {
  RecurringTask,
  RecurringTaskCreateInput,
} from "@/types/recurring-task";

// タスク作成
export async function createRecurringTask(task: RecurringTaskCreateInput) {
  const id = await insertRecurringTask(task);
  revalidatePath("/recurring-tasks");
  return id;
}

// タスク更新
export async function updateRecurringTask(task: RecurringTask) {
  await updateRecurringTaskById(task);
  revalidatePath("/recurring-tasks");
}

// タスク削除
export async function deleteRecurringTask(id: string) {
  await deleteRecurringTaskById(id);
  revalidatePath("/recurring-tasks");
}
