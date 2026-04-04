"use client"

import { ClipboardList } from "lucide-react"
import { TaskCard } from "./task-card"
import type { Task } from "@/types/task"
import { Empty } from "@/components/ui/empty"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export function TaskList({ tasks, onToggleComplete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Empty
        icon={ClipboardList}
        title="タスクがありません"
        description="新規タスクを作成して始めましょう"
      />
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
