"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Member, MemberCreateInput } from "@/types/member";

const AVATAR_ICONS = [
  "👤",
  "👦",
  "👧",
  "👨",
  "👩",
  "👴",
  "👵",
  "🧑",
  "👶",
  "🐱",
  "🐶",
  "🦊",
  "🐻",
  "🐼",
  "🦁",
  "🐸",
];

type MemberModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  userId: string;
  onCreate: (member: MemberCreateInput) => void;
  onUpdate: (member: Member) => void;
  onDelete?: (id: string) => void;
};

type FormState = {
  id?: string;
  name: string;
  icon: string;
  userId: string;
};

// フォーム初期化
const initFormState = (userId: string, member?: Member | null): FormState => {
  if (member) {
    console.log(member);
    return {
      id: member.id,
      name: member.name,
      icon: member.icon,
      userId: member.userId,
    };
  } else {
    return {
      name: "",
      icon: AVATAR_ICONS[0],
      userId: userId,
    };
  }
};

export function MemberModal({
  open,
  onOpenChange,
  member,
  userId,
  onCreate,
  onUpdate,
  onDelete,
}: MemberModalProps) {
  const [form, setForm] = useState<FormState>(initFormState(userId, member));

  useEffect(() => {
    if (open) {
      setForm(initFormState(userId, member));
    }
  }, [open, member, userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (member) {
      onUpdate({
        id: member?.id,
        name: form.name,
        icon: form.icon,
        userId: form.userId,
        isUser: false,
      });
    } else {
      onCreate({
        name: form.name,
        icon: form.icon,
        userId: form.userId,
        isUser: false,
      });
    }
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (member && onDelete) {
      onDelete(member.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {member ? "メンバーを編集" : "メンバーを追加"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="member-name">名前</Label>
            <Input
              id="member-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="メンバーの名前"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>アイコン</Label>
            <div className="grid grid-cols-8 gap-2">
              {AVATAR_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={(e) => setForm({ ...form, icon: emoji })}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-colors ${
                    form.icon === emoji
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            {member && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="mr-auto"
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
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
