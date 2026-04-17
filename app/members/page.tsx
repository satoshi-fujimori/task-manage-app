"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { MemberCard } from "@/app/members/components/member-card"
import { MemberModal } from "@/app/members/components/member-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Plus, Users } from "lucide-react"
import type { Member } from "@/types/auth"

export default function MembersPage() {
  const { user, isAuthenticated, addMember, updateMember, deleteMember } = useAuth()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  if (!isAuthenticated || !user) {
    router.push("/login")
    return null
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setModalOpen(true)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member)
    setModalOpen(true)
  }

  const handleSave = (memberData: Omit<Member, "id"> & { id?: string }) => {
    if (memberData.id) {
      updateMember(memberData as Member)
    } else {
      addMember(memberData)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
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
        {user.members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">メンバーがいません</h2>
            <p className="text-muted-foreground mb-6">
              家族やチームメンバーを追加して、<br />タスクを共有しましょう
            </p>
            <Button onClick={handleAddMember}>
              <Plus className="mr-2 h-4 w-4" />
              メンバーを追加
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {user.members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => handleEditMember(member)}
              />
            ))}
          </div>
        )}
      </main>

      <MemberModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        member={editingMember}
        onSave={handleSave}
        onDelete={deleteMember}
      />
    </div>
  )
}
