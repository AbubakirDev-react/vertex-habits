import { eachDayOfInterval, endOfWeek, startOfWeek,format, isFuture, isSameDay, subDays, isToday } from "date-fns"
import Button from "./ui/Button"
import type { HabitItemProps } from "../types"
import { useHabit } from "../context/habit.context"
import { useDates } from "../context/dates.context";
import { Flame, Trash2 } from "lucide-react";
import CircularProgress from "./ui/CircularProgress";




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
    <div className="drop-shadow-sm rounded-xl bg-(--surface) p-4 grid grid-cols-6 gap-3 items-center justify-evenly">
        <CircularProgress value={habit.completions.length} max={visibleDates.length} size={48}>
          
            <icon.Icon size={18} />
          
        </CircularProgress>
      <div className="col-span-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{habit.title}</p>
      </div>
      </div>
      <div className="flex gap-3">
        {visibleDates.map(date=>(
          <Button onClick={()=>toggleHabit(habit.id, date)} variant={habit.completions.some(d=>isSameDay(date,d))?"primary":"secondary"} className={`flex flex-1 flex-col items-center gap-0.5 text-xs ${isToday(date) && 'border-2' }`} key={date.toISOString()} disabled={isFuture(date)}>
          </Button>
        ))}
      </div>
    </div>
      <div className="flex items-center justify-center gap-2">
          {streak!==0 && <p className="text-sm text-(--primary) flex gap-1"><Flame /> {streak}</p> }
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