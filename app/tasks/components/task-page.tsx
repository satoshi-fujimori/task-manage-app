"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { Header } from "@/app/tasks/components/header"
import { SearchBar } from "@/app/tasks/components/search-bar"
import { FilterTabs } from "@/app/tasks/components/filter-tabs"
import { TaskList } from "@/app/tasks/components/task-list"
import { TaskModal } from "@/app/tasks/components/task-modal"
import type { Task, FilterType, TaskCreateInput } from "@/types/task"
import type { Member } from "@/types/member"
import { User } from "@/types/auth"
import { createTask, deleteTask, toggleTask, updateTask } from "../actions"
import { DateFilter } from "./date-filter"

export default function TasksPage({ user, initialTasks, displayDate, members }
  : { user: User | undefined, initialTasks: Task[], displayDate: string, members: Member[] }) {

  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>(displayDate);
  const [filter, setFilter] = useState<FilterType>("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks]);
  
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
        return new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime()
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

  // タスク完了状態の切り替え
  const handleToggleComplete = async (task: Task) => {
    await toggleTask(task.id, task.completed);
    router.refresh();
  }

  // タスク編集モーダルを開く
  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  // タスク編集モーダルを開く
  const handleCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  // タスク作成
  const handleCreateTask = (task: TaskCreateInput) => {
    createTask(task);
    router.refresh();
  }


  // タスク更新
  const handleUpdateTask = (task:Task) => {
      updateTask(task);
      router.refresh();
  }

  // タスク削除
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    router.refresh();
  }

  // 日付フィルタの変更に伴う検索
  const handleDateChange = (date: string) => {
    setDateFilter(date);
    router.push(`/tasks?displayDate=${date}`);
  }

    return (
      <div className="min-h-screen bg-background">
        <Header onCreateTask={handleCreate} />

        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
            <FilterTabs value={filter} onChange={setFilter} counts={counts} />
            <div className="w-full sm:max-w-xs flex gap-2">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <DateFilter value={dateFilter} onChange={handleDateChange} />
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
          members={members}
          onCreate={handleCreateTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDelete}
        />
      </div>
    );
}
