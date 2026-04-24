"use client"

import { ClipboardList } from "lucide-react"
import { TaskCard } from "./task-card"
import type { Task } from "@/types/task"
import { Empty } from "@/components/ui/empty"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (task: Task) => void
  onEdit: (task: Task) => void
}

export function TaskList({ tasks, onToggleComplete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Empty>
        <ClipboardList className="h-10 w-10 text-muted-foreground" />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">タスクがありません</h3>
          <p className="text-sm text-muted-foreground">
            新規タスクを作成して始めましょう
          </p>
        </div>
      </Empty>
    )
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
