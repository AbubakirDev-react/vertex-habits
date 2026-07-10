import { ChartColumn, ChartNoAxesColumn, Flame } from "lucide-react";
import HabitList from "../components/HabitList";
import { useHabit } from "../context/habit.context";
import { isSameWeek, isToday } from "date-fns";
import CircularProgress from "../components/ui/CircularProgress";
import Header from "../components/Header";
import { useTheme } from "../context/theme.context";


export default function Dashboard() {
  const {habits} = useHabit();
  const completedToday = habits.filter(h=>h.completions.some(c=>isToday(c))).length
  return (

    <div className="mb-16">
      <Header/>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-(--surface) rounded-2xl flex items-center gap-2 border border-(--border)">
          <CircularProgress value={completedToday} max={habits.length} size={48} />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl">{completedToday}/{habits.length}</h3>
            <span className="text-xs text-(--text-secondary)">Completed Today</span>
          </div>
        </div>
        <div className="p-3 bg-(--surface) rounded-2xl flex items-center gap-2 border border-(--border)">
          <div className="text-(--primary)">
            <Flame />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl">60</h3>
            <span className="text-xs text-(--text-secondary)">Best Streak</span>
          </div>
        </div>
        <div className="p-3 bg-(--surface) rounded-2xl flex items-center gap-2 border border-(--border)">
          <div className="text-(--primary)">
            <ChartNoAxesColumn />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl">63%</h3>
            <span className="text-xs text-(--text-secondary)">7-day completion</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1 p-1">
        <h3 className="uppercase">habits</h3>
        <HabitList/>
      </div>
    </div>
  )
}
