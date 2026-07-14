import type { ReactNode } from "react"

export type Habit = {
  id: string
  title: string
  icon_key: string
  completions: Date[]
}

export type HabitListProps = {
  habits: Habit[]
  deleteHabit:(id:string) => void
  toggleHabit:(id:string,date:Date) => void
}

export type HabitItemProps = {
  habit: Habit
  deleteHabit: (id: string) => void
  toggleHabit: (id: string,date: Date) => void
}

export type CircularProgressProps = {
  children?: ReactNode
  value: number
  max: number
  size: number
}