import { eachDayOfInterval, endOfWeek, startOfWeek,format, isFuture } from "date-fns"
import Button from "./ui/Button"
import type { Habit } from "../types/Habit"


type HabitListProps = {
  habits: Habit[]
  deleteHabit: (id:string) => void
}

export default function HabitList({habits,deleteHabit }: HabitListProps){
  if(habits.length===0){
    return <p className="text-center text-secondary py-12">
      No habits yet. Add one above to get started!
    </p>
  }
  return <div className="flex flex-col gap-3">
    {habits.map( habit => <HabitItem deleteHabit={deleteHabit} key={habit.id} habit={habit} /> )}
  </div>
}

type HabitItemProps = {
  habit: Habit
  deleteHabit: (id:string) => void
}

function HabitItem({habit,deleteHabit }: HabitItemProps){
  const visible_dates = eachDayOfInterval({start: startOfWeek(new Date()),end: endOfWeek(new Date())})
  return (
    <div className="drop-shadow-sm rounded-xl bg-(--surface) p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{habit.title}</p>
          <span className="text-(--warning)">🔥3</span>
        </div>
        <Button onClick={()=>deleteHabit(habit.id)} variant="danger">Delete</Button>
      </div>
      <div className="flex gap-3">
        {visible_dates.map(date=>(
          <Button variant="primary" className="flex flex-1 flex-col items-center gap-0.5 text-xs" key={date.toISOString()} disabled={isFuture(date)}>
            <span>{format(date,"EE")}</span>
            <span>{format(date,"d")}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}