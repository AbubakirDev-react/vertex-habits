import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";
import { useHabit } from "../context/habit.context";
import { format, isToday, startOfWeek } from "date-fns";
import { useDates } from "../context/dates.context";

export default function Header() {
  const {habits} = useHabit();
  const completedToday = habits.filter(h=>h.completions.some(c=>isToday(c))).length
  const { visibleDates,next,prev } = useDates();
  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Vertex Habits</h1>
        <span className="text-secondary text-sm">{completedToday}/{habits.length} done today</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-secondary text-sm">{dateRange}</span>
        <div className="flex gap-1">
          <Button onClick={prev} variant="primary"><ChevronLeft /></Button>
          <Button onClick={next} variant="primary" disabled={visibleDates.some(d=> isToday(d))}><ChevronRight /></Button>
        </div>
      </div>
    </header>
  )
}
