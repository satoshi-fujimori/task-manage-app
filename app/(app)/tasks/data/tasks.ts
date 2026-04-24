import type { Task } from "@/types/task";

export const initialTasks: Task[] = [
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
];
