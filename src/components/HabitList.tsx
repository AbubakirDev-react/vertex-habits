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

  const today = new Date()
  const todayProgress = habit.completions.some(c=>isSameDay(c,today))?1:0

  return (
    <button onClick={()=>toggleHabit(habit.id, today)} className="drop-shadow-sm rounded-xl bg-(--surface) p-4 grid grid-cols-6 gap-3 items-center justify-evenly cursor-pointer duration-300 border border-(--border) hover:bg-(--surface-hover) active:bg-(--surface-active)">
        <CircularProgress value={todayProgress} max={1} size={48} variant="success">
          
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
          <div className={`flex p-1 rounded-full flex-col items-center gap-0.5 text-xs ${habit.completions.some(c=>isSameDay(c,date)) ? 'bg-(--primary)' : 'bg-(--border)'} ${isToday(date) && 'border-2' } ${isFuture(date) && 'opacity-50'}`} key={date.toISOString()}>
          </div>
        ))}
      </div>
    </div>
      <div className="flex items-center justify-center gap-2">
          {streak!==0 && <p className="text-sm text-(--primary) flex gap-1"><Flame /> {streak}</p> }
      </div>
    </button>
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