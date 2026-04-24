"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MemberCard } from "./member-card";
import { MemberModal } from "./member-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Plus, Users } from "lucide-react";
import type { Member, MemberCreateInput } from "@/types/member";
import { createMember, updateMember } from "../actions";

export default function MembersPage({
  members,
  userId,
}: {
  members: Member[];
  userId: string;
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // メンバー編集モーダルを開く
  const handleAddMember = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  // メンバー編集モーダルを開く
  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  // メンバー作成
  const handleCreateMember = (member: MemberCreateInput) => {
    createMember(member);
    router.refresh();
  };

  // メンバー更新
  const handleUpdateMember = (member: Member) => {
    updateMember(member);
    router.refresh();
  };

  const handleDelete = () => {};

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">メンバー管理</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddMember} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              追加
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onClick={() => handleEditMember(member)}
            />
          ))}
        </div>
      </main>

      <MemberModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        member={editingMember}
        userId={userId}
        onCreate={handleCreateMember}
        onUpdate={handleUpdateMember}
        onDelete={handleDelete}
      />
    </div>
  );
}
