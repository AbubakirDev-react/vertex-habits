import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Habit } from "../types"
import { differenceInDays, isSameDay } from "date-fns"
import { Footprints, BookOpen, Sparkles, Droplets, Ban,
  Dumbbell, Pencil, Coffee, Music, } from "lucide-react";




type Context = {
  habits: Habit[]
  addHabit: (title: string, icon_key:string) => void
  deleteHabit: (id: string) => void
  toggleHabit: (id:string, date: Date) => void
}

const HabitContext = createContext<null | Context>(null)


type HabitProviderProps = {
  children: ReactNode
}
export function HabitProvider({children}: HabitProviderProps){
  const [habits,setHabits] = useState<Habit[]>(()=>{
    const saved = localStorage.getItem('habits')
    return saved?JSON.parse(saved):[]
  })
  const ICON_OPTIONS = [
  { key: "Footprints", Icon: Footprints },
  { key: "BookOpen", Icon: BookOpen },
  { key: "Sparkles", Icon: Sparkles },
  { key: "Droplets", Icon: Droplets },
  { key: "Ban", Icon: Ban },
  { key: "Dumbbell", Icon: Dumbbell },
  { key: "Pencil", Icon: Pencil },
  { key: "Coffee", Icon: Coffee },
  { key: "Music", Icon: Music },
];
  useEffect(()=>{
    localStorage.setItem('habits',JSON.stringify(habits))
  },[habits])

  function addHabit(title: string,icon_key: string){
    setHabits(prev=>[...prev,{id: crypto.randomUUID(),title,icon_key, completions:[]}])
    console.log('Habit list changed' + title + ' has added to list!')  
  }


  function deleteHabit(id: string){
    setHabits(habits.filter(h=>h.id!==id))
    console.log('Habit list changed: '+habits.find(h=>h.id===id)?.title + ' is deleted from list!')
  }

  function toggleHabit(id: string, date: Date){
    setHabits(prev=>(
      prev.map(h=>{
        if(h.id!==id) return h

        const alreadyDone = h.completions.some(c=>isSameDay(c, date))
        const completions = alreadyDone?h.completions.filter(c=>!isSameDay(c,date)):[...h.completions,date]
        return {...h,completions}
      })
    ))
  }
  
  return <HabitContext.Provider value={{habits,toggleHabit,deleteHabit,addHabit,ICON_OPTIONS }}>{children}</HabitContext.Provider>
}

export function useHabit(){
  const context = useContext(HabitContext)
  return context
}

export function getLongestStreak(completions: Date[] | string[]): number {
  if (!completions || completions.length === 0) return 0;
  
  const sortedDates = completions
    .map(date => typeof date === 'string' ? new Date(date) : date)
    .filter(date => !isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());
  
  if (sortedDates.length === 0) return 0;
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    
    const diffDays = differenceInDays(currentDate, prevDate);
    
    if (diffDays === 1) {
      currentStreak++;
    } else if (diffDays > 1) {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  
  longestStreak = Math.max(longestStreak, currentStreak);
  
  return longestStreak;
}
