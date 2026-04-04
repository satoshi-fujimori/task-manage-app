"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/tasks/header"
import { SearchBar } from "@/components/tasks/search-bar"
import { FilterTabs } from "@/components/tasks/filter-tabs"
import { TaskList } from "@/components/tasks/task-list"
import { TaskModal } from "@/components/tasks/task-modal"
import type { Task, FilterType } from "@/types/task"

// サンプルタスクデータ
const initialTasks: Task[] = [
  {
    id: "1",
    title: "プロジェクト企画書を作成する",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "クライアントミーティングの準備",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "週次レポートの提出",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    completed: false,
  },
  {
    id: "4",
    title: "チームメンバーへのフィードバック",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    completed: false,
  },
  {
    id: "5",
    title: "新機能のコードレビュー",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    completed: true,
  },
  {
    id: "6",
    title: "ドキュメントの更新",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    completed: true,
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // 検索フィルタ
        if (
          searchQuery &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false
        }
        // 完了状態フィルタ
        if (filter === "completed" && !task.completed) return false
        if (filter === "incomplete" && task.completed) return false
        return true
      })
      .sort((a, b) => {
        // 未完了を先に表示、その後期限順
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
  }, [tasks, searchQuery, filter])

  const counts = useMemo(() => {
    const all = tasks.filter((t) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ).length
    const completed = tasks.filter(
      (t) =>
        t.completed &&
        (searchQuery
          ? t.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
    ).length
    return {
      all,
      completed,
      incomplete: all - completed,
    }
  }, [tasks, searchQuery])

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const handleSave = (taskData: Omit<Task, "id"> & { id?: string }) => {
    if (taskData.id) {
      // 編集
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskData.id ? { ...task, ...taskData } : task
        )
      )
    } else {
      // 新規作成
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
      }
      setTasks((prev) => [...prev, newTask])
    }
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateTask={handleCreate} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs value={filter} onChange={setFilter} counts={counts} />
          <div className="w-full sm:max-w-xs">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <div className="mt-6">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
          />
        </div>
      </main>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
