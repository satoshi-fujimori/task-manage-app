"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FilterType } from "@/types/task"

interface FilterTabsProps {
  value: FilterType
  onChange: (value: FilterType) => void
  counts: {
    all: number
    incomplete: number
    completed: number
  }
}

export function FilterTabs({ value, onChange, counts }: FilterTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as FilterType)}>
      <TabsList>
        <TabsTrigger value="all">
          すべて
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.all}
          </span>
        </TabsTrigger>
        <TabsTrigger value="incomplete">
          未完了
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.incomplete}
          </span>
        </TabsTrigger>
        <TabsTrigger value="completed">
          完了
          <span className="ml-1.5 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
            {counts.completed}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
