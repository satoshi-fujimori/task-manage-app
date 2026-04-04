"use client"

import { Plus, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  onCreateTask: () => void
}

export function Header({ onCreateTask }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="size-6 text-primary" />
          <h1 className="text-xl font-bold">タスク管理</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={onCreateTask} className="gap-2">
            <Plus className="size-4" />
            <span className="hidden sm:inline">新規タスク</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
