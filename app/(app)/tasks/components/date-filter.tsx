"use client"

interface DateFilterProps {
  value: string | null
  onChange: (value: string) => void
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="border rounded px-2 text-sm"
    />
  )
}