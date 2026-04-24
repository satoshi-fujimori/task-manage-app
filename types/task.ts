export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  info?: string;
  limitDate: string; // ISO date string
  priority: Priority;
  completed: boolean;
  memberId: string;
  recurringTaskId?: string;
  deleteFlg: boolean;
};

export type TaskCreateInput = Omit<Task, "id">;

export type FilterType = "all" | "incomplete" | "completed";

export type TaskRecord = {
  // tasks columns
  id: string;
  title: string;
  info: string;
  limit_date: string;
  priority: Priority;
  completed: boolean;
  recurring_task_id: string;
  member_id: string;
  delete_flg: boolean;

  // joined
  members: {
    user_id: string;
  };
};
