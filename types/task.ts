export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  info?: string;
  limitDate: string; // ISO date string
  priority: Priority;
  completed: boolean;
  memberId: string;
};

export type TaskCreateInput = Omit<Task, "id">;

export type FilterType = "all" | "incomplete" | "completed";
