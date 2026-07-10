import { ChevronLeft, ChevronRight, MoonStar, Sun, SunMedium } from "lucide-react";
import Button from "./ui/Button";
import { useHabit } from "../context/habit.context";
import { format, isToday, startOfWeek } from "date-fns";
import { useDates } from "../context/dates.context";
import { useTheme } from "../context/theme.context";

export default function Header() {
  const {habits} = useHabit();
  const completedToday = habits.filter(h=>h.completions.some(c=>isToday(c))).length
  const { visibleDates,next,prev } = useDates();
  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`
  const {theme,toggleTheme} = useTheme();
  return (
    <header className="p-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <button className="text-(--text-secondary) cursor-pointer p-3 rounded-full border-2 border-(--border) duration-300 hover:text-(--text) hover:border-(--border-hover)" onClick={toggleTheme}>{theme==="dark"?<Sun/>:<MoonStar/>}</button>
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
