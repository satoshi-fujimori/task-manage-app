"use client";

import { ClipboardList } from "lucide-react";
import { RecurringTaskCard } from "./recurring-task-card";
import { Empty } from "@/components/ui/empty";
import { RecurringTask } from "@/types/recurring-task";

interface TaskListProps {
  tasks: RecurringTask[];
  onEdit: (task: RecurringTask) => void;
}

export function RecurringTaskList({ tasks, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Empty>
        <ClipboardList className="h-10 w-10 text-muted-foreground" />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">定期タスクがありません</h3>
          <p className="text-sm text-muted-foreground">
            新規定期タスクを作成して始めましょう
          </p>
        </div>
      </Empty>
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <RecurringTaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}
