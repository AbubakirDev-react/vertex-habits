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
  value: number
  max: number
  size: number
}