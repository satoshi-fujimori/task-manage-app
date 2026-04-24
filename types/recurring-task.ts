import { Priority } from "./task";

export type RecurringTask = {
  id: string;
  title: string;
  info?: string;
  priority: Priority;
  memberId: string;
};

export type RecurringTaskCreateInput = Omit<RecurringTask, "id">;
