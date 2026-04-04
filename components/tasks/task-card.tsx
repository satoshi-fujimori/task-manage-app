"use client"

import { format, isPast, isToday } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon, Pencil } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Task, Priority } from "@/types/task"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: {
    label: "高",
    className: "bg-red-500/15 text-red-500 border-red-500/20 hover:bg-red-500/20",
  },
  medium: {
    label: "中",
    className: "bg-amber-500/15 text-amber-500 border-amber-500/20 hover:bg-amber-500/20",
  },
  low: {
    label: "低",
    className: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20",
  },
}

export function TaskCard({ task, onToggleComplete, onEdit }: TaskCardProps) {
  const dueDate = new Date(task.dueDate)
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !task.completed
  const priority = priorityConfig[task.priority]

  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:shadow-md",
        task.completed && "opacity-60"
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="size-5"
          aria-label={task.completed ? "タスクを未完了にする" : "タスクを完了にする"}
        />
        
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium truncate text-foreground",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          
          <div className="flex items-center gap-2 mt-1.5">
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                isOverdue ? "text-red-500" : "text-muted-foreground"
              )}
            >
              <CalendarIcon className="size-3.5" />
              <span className={cn(isOverdue && "font-medium")}>
                {format(dueDate, "M月d日 (E)", { locale: ja })}
              </span>
            </div>
            
            <Badge variant="outline" className={cn("text-xs", priority.className)}>
              {priority.label}
            </Badge>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onEdit(task)}
          aria-label="タスクを編集"
        >
          <Pencil className="size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
