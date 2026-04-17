"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Member, MemberType } from "@/types/auth"

const AVATAR_ICONS = ["👤", "👦", "👧", "👨", "👩", "👴", "👵", "🧑", "👶", "🐱", "🐶", "🦊", "🐻", "🐼", "🦁", "🐸"]

interface MemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: Member | null
  onSave: (member: Omit<Member, "id"> & { id?: string }) => void
  onDelete?: (id: string) => void
}

export function MemberModal({ open, onOpenChange, member, onSave, onDelete }: MemberModalProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState<MemberType>("adult")
  const [icon, setIcon] = useState(AVATAR_ICONS[0])

  useEffect(() => {
    if (member) {
      setName(member.name)
      setType(member.type)
      setIcon(member.icon)
    } else {
      setName("")
      setType("adult")
      setIcon(AVATAR_ICONS[0])
    }
  }, [member, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: member?.id,
      name,
      type,
      icon,
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (member && onDelete) {
      onDelete(member.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{member ? "メンバーを編集" : "メンバーを追加"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="member-name">名前</Label>
            <Input
              id="member-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="メンバーの名前"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>タイプ</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as MemberType)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adult" id="adult" />
                <Label htmlFor="adult" className="cursor-pointer">大人</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="child" id="child" />
                <Label htmlFor="child" className="cursor-pointer">子供</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>アイコン</Label>
            <div className="grid grid-cols-8 gap-2">
              {AVATAR_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-colors ${
                    icon === emoji
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
              <Button type="button" variant="destructive" onClick={handleDelete} className="mr-auto">
                削除
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
