"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../../tasks/components/search-bar";
import { RecurringTaskList } from "./recurring-task-list";
import { RecurringTaskModal } from "./recurring-task-modal";
import type { Member } from "@/types/member";
import { User } from "@/types/auth";
import {
  createRecurringTask,
  updateRecurringTask,
  deleteRecurringTask,
} from "../actions";
import {
  RecurringTask,
  RecurringTaskCreateInput,
} from "@/types/recurring-task";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RecurringTaskPage({
  initialTasks,
  members,
}: {
  user: User | undefined;
  initialTasks: RecurringTask[];
  members: Member[];
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState<RecurringTask[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<RecurringTask | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 検索フィルタ
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [tasks, searchQuery]);

  // タスク編集モーダルを開く
  const handleEdit = (task: RecurringTask) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // タスク編集モーダルを開く
  const handleCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // タスク作成
  const handleCreateTask = (task: RecurringTaskCreateInput) => {
    createRecurringTask(task);
    router.refresh();
  };

  // タスク更新
  const handleUpdateTask = (task: RecurringTask) => {
    updateRecurringTask(task);
    router.refresh();
  };

  // タスク削除
  const handleDelete = async (id: string) => {
    await deleteRecurringTask(id);
    router.refresh();
    setModalOpen(false);
  };

  // タスク画面へ遷移
  const handleMoveToTaskPage = () => {
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Button variant="outline" onClick={() => handleMoveToTaskPage()}>
              タスク管理
            </Button>
          </div>
          <Button onClick={handleCreate} className="gap-2 w-auto self-start">
            <Plus className="size-4" />
          </Button>
        </div>

        <div className="mt-6">
          <RecurringTaskList tasks={filteredTasks} onEdit={handleEdit} />
        </div>
      </main>

      <RecurringTaskModal
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
