"use server";

import { revalidatePath } from "next/cache";
import {
  insertTask,
  updateTaskById,
  toggleTaskById,
  deleteTaskById,
} from "@/lib/tasks";
import { Task, TaskCreateInput } from "@/types/task";

// タスク作成
export async function createTask(task: TaskCreateInput) {
  await insertTask(task);
  revalidatePath("/tasks");
}

// タスク更新
export async function updateTask(task: Task) {
  await updateTaskById(task);
  revalidatePath("/tasks");
}

// 完了状態更新
export async function toggleTask(id: string, completed: boolean) {
  await toggleTaskById(id, completed);
  revalidatePath("/tasks");
}

// タスク削除
export async function deleteTask(id: string) {
  await deleteTaskById(id);
  revalidatePath("/tasks");
}
