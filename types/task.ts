export type Priority = "high" | "medium" | "low"

export interface Task {
  id: string
  title: string
  dueDate: string // ISO date string
  priority: Priority
  completed: boolean
}

export type FilterType = "all" | "incomplete" | "completed"
