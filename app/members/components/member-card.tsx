"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Member } from "@/types/auth"

interface MemberCardProps {
  member: Member
  onClick: () => void
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:ring-2 hover:ring-primary/20"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-3xl">
          {member.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{member.name}</h3>
          <Badge variant={member.type === "adult" ? "default" : "secondary"} className="mt-1">
            {member.type === "adult" ? "大人" : "子供"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
