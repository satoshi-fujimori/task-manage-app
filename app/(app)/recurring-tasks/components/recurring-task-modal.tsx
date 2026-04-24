"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Member } from "@/types/member";
import {
  RecurringTask,
  RecurringTaskCreateInput,
} from "@/types/recurring-task";
import { Priority } from "@/types/task";

type RecurringTaskModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: RecurringTask | null;
  members: Member[];
  onCreate: (task: RecurringTaskCreateInput) => void;
  onUpdate: (task: RecurringTask) => void;
  onDelete?: (id: string) => void;
};

type FormState = {
  id?: string;
  title: string;
  info?: string;
  priority: Priority;
  memberId: string;
};

// フォーム初期化
const initFormState = (task?: RecurringTask | null): FormState => {
  if (task) {
    return {
      id: task.id,
      title: task.title,
      info: task.info,
      priority: task.priority,
      memberId: task.memberId,
    };
  } else {
    return {
      title: "",
      info: undefined,
      priority: "medium",
      memberId: "",
    };
  }
};

// フォームバリデーション
const validate = (form: FormState) => {
  // title（必須）
  if (!form.title.trim()) {
    alert("タイトルは必須です");
    return false;
  }

  // priority（必須）
  if (!form.priority) {
    alert("優先度は必須です");
    return false;
  }

  // info（空文字なら undefined に変換）
  if (form.info && !form.info.trim()) {
    form.info = undefined;
  }

  return true;
};

export function RecurringTaskModal({
  open,
  onOpenChange,
  task,
  members,
  onCreate,
  onUpdate,
  onDelete,
}: RecurringTaskModalProps) {
  const [form, setForm] = useState<FormState>(initFormState(task));
  const isEditing = !!task;

  useEffect(() => {
    setForm(initFormState(task));
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(form)) return;

    if (isEditing) {
      onUpdate({
        id: task?.id,
        title: form.title,
        info: form.info,
        priority: form.priority,
        memberId: form.memberId,
      });
    } else {
      onCreate({
        title: form.title,
        info: form.info,
        priority: form.priority,
        memberId: form.memberId,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "定期タスクを編集" : "新規定期タスク"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "定期タスクの内容を変更します"
              : "新しい定期タスクを作成します"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="定期タスクのタイトルを入力"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="priority">優先度</Label>
            <Select
              value={form.priority}
              onValueChange={(v) =>
                setForm({ ...form, priority: v as Priority })
              }
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="優先度を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="priority">やる人</Label>
            <Select
              value={form.memberId}
              onValueChange={(v) => setForm({ ...form, memberId: v as string })}
            >
              <SelectTrigger id="memberId">
                <SelectValue placeholder="やる人を選択" />
              </SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            {isEditing && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => onDelete(task.id)}
                className="sm:mr-auto"
              >
                削除
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button type="submit">{isEditing ? "保存" : "作成"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
