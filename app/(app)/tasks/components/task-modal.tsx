"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
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
import type { Task, Priority, TaskCreateInput } from "@/types/task";
import type { Member } from "@/types/member";
import { RecurringTaskCreateInput } from "@/types/recurring-task";
import { id } from "date-fns/locale";

type TaskModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  members: Member[];
  onCreate: (task: TaskCreateInput) => void;
  onCreateRecurring: (
    task: RecurringTaskCreateInput,
    id: string | undefined,
  ) => void;
  onUpdate: (task: Task) => void;
  onDelete?: (id: string) => void;
};

type FormState = {
  id?: string;
  title: string;
  info?: string;
  limitDate: string;
  priority: Priority;
  memberId: string;
};

// フォーム初期化
const initFormState = (task?: Task | null): FormState => {
  if (task) {
    return {
      id: task.id,
      title: task.title,
      info: task.info,
      limitDate: format(new Date(task.limitDate), "yyyy-MM-dd"),
      priority: task.priority,
      memberId: task.memberId,
    };
  } else {
    return {
      title: "",
      info: undefined,
      limitDate: format(new Date(), "yyyy-MM-dd"),
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

  // limitDate（必須 + フォーマット yyyy-MM-dd）
  if (!form.limitDate) {
    alert("期限日は必須です");
    return false;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.limitDate)) {
    alert("期限日は yyyy-MM-dd 形式で入力してください");
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

export function TaskModal({
  open,
  onOpenChange,
  task,
  members,
  onCreate,
  onCreateRecurring,
  onUpdate,
  onDelete,
}: TaskModalProps) {
  const [form, setForm] = useState<FormState>(initFormState(task));
  const isEditing = !!task;

  useEffect(() => {
    setForm(initFormState(task));
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(form)) return;

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const action = submitter?.value;

    if (action == "recurring-task") {
      onCreateRecurring(
        {
          title: form.title,
          info: form.info,
          priority: form.priority,
          memberId: form.memberId,
        },
        form.id,
      );
    }
    if (isEditing) {
      onUpdate({
        id: task?.id,
        title: form.title,
        info: form.info,
        limitDate: new Date(form.limitDate).toISOString(),
        priority: form.priority,
        completed: task?.completed ?? false,
        memberId: form.memberId,
      });
    } else {
      onCreate({
        title: form.title,
        info: form.info,
        limitDate: new Date(form.limitDate).toISOString(),
        priority: form.priority,
        completed: false,
        memberId: form.memberId,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "タスクを編集" : "新規タスク"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "タスクの内容を変更します"
              : "新しいタスクを作成します"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="タスクのタイトルを入力"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="limitDate">期限</Label>
            <Input
              id="limitDate"
              type="date"
              value={form.limitDate}
              onChange={(e) => setForm({ ...form, limitDate: e.target.value })}
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
              type="submit"
              name="action"
              variant="secondary"
              value="recurring-task"
            >
              定期タスク登録
            </Button>
            <Button
              type="button"
              name="action"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" value="task">
              {isEditing ? "保存" : "作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
