import { ChartColumn, ChartNoAxesColumn, Flame } from "lucide-react";
import HabitList from "../components/HabitList";
import { useHabit } from "../context/habit.context";
import { isSameDay, isSameWeek, isToday } from "date-fns";
import CircularProgress from "../components/ui/CircularProgress";
import Header from "../components/Header";
import { useTheme } from "../context/theme.context";
import { useDates } from "../context/dates.context";
import { getLongestStreak } from "../context/habit.context";


export default function Dashboard() {
  const {habits} = useHabit();
  const completedToday = habits.filter(h=>h.completions.some(c=>isToday(c))).length
  const {visibleDates} = useDates();


  const calculateWeeklyProgress=()=>{

    const totalTasks = habits.length * 7;

    if(totalTasks === 0) return 0;

    let completedCount = 0;
    habits.forEach(habit=>{
      visibleDates.forEach(date=>{
        if(habit.completions.some(c=>isSameDay(c, date))){
          completedCount++;
        }
      });
    });
    return Math.round((completedCount / totalTasks) *100 );
  }
  const calculateBestStreak=()=>{
    if(habits.length===0) return 0;

    const allStreaks = habits.map(habit=>getLongestStreak(habit.completions));
    return Math.max(...allStreaks)
  }
  const bestStreak = calculateBestStreak()
  const weeklyCompletion = calculateWeeklyProgress();
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
            <h3 className="text-2xl">{bestStreak}</h3>
            <span className="text-xs text-(--text-secondary)">Best Streak</span>
          </div>
        </div>
        <div className="p-3 bg-(--surface) rounded-2xl flex items-center gap-2 border border-(--border)">
          <div className="text-(--primary)">
            <ChartNoAxesColumn />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl">{weeklyCompletion}%</h3>
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
