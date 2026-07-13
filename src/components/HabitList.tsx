import { eachDayOfInterval, endOfWeek, startOfWeek,format, isFuture, isSameDay, subDays, isToday } from "date-fns"
import Button from "./ui/Button"
import type { HabitItemProps } from "../types"
import { useHabit } from "../context/habit.context"
import { useDates } from "../context/dates.context";
import { Trash2 } from "lucide-react";




export default function HabitList(){
  const {habits} = useHabit();
  if(habits.length===0){
    return <p className="text-center text-secondary py-12">
      No habits yet. Add one above to get started!
    </p>
  }
  return <div className="flex flex-col gap-3">
    {habits.map( habit => <HabitItem key={habit.id} habit={habit} /> )}
  </div>
}



function HabitItem({habit }: HabitItemProps){
  // const visible_dates = eachDayOfInterval({start: startOfWeek(new Date()),end: endOfWeek(new Date())})
  const {ICON_OPTIONS} = useHabit();
  const {visibleDates} = useDates();
  const streak = getStreak(habit.completions)
  const {deleteHabit, toggleHabit} = useHabit();
  const icon = ICON_OPTIONS.find(i=>i.key===habit.icon_key)
  return (
    <div className="drop-shadow-sm rounded-xl bg-(--surface) p-4 flex gap-3 items-center justify-evenly">
      <div className="px-2">
        <icon.Icon/>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{habit.title}</p>
          {streak!==0 &&
          <span className="text-(--warning)">🔥{streak}</span>
          }
        </div>
        <Button onClick={()=>deleteHabit(habit.id)} variant="danger"><Trash2/></Button>
      </div>
      <div className="flex gap-3">
        {visibleDates.map(date=>(
          <Button onClick={()=>toggleHabit(habit.id, date)} variant={habit.completions.some(d=>isSameDay(date,d))?"primary":"secondary"} className={`flex flex-1 flex-col items-center gap-0.5 text-xs ${isToday(date) && 'border-2' }`} key={date.toISOString()} disabled={isFuture(date)}>
            <span>{format(date,"EE")}</span>
            <span>{format(date,"d")}</span>
          </Button>
        ))}
      </div>
      </div>
    </div>
  )
}

function getStreak(completions: Date[]){
  let streak = 0
  let date = new Date()

  while (completions.some(c=> isSameDay(c,date))){
    streak++
    date = subDays(date ,1)
  }
  return streak
}