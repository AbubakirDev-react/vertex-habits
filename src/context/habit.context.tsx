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


// Morning Run, Read a 20 pages, Meditate, Drink Water, Exercise, No Sugar, Write Journal, Drink Coffee, Listen to Music

const initial_habits = [
  {
    id: 1,
    title: "Morning Run",
    icon_key: "Footprints",
    completions: []
  },
  {
    id: 2,
    title: "Read a 20 pages",
    icon_key: "BookOpen",
    completions: []
  },
  {
    id: 3,
    title: "Meditate",
    icon_key: "Sparkles",
    completions: []
  },
  {
    id: 4,
    title: "Drink Water",
    icon_key: "Droplets",
    completions: []
  },
  {
    id: 5,
    title: "Exercise",
    icon_key: "Dumbbell",
    completions: []
  },
  {
    id: 6,
    title: "No Sugar",
    icon_key: "Ban",
    completions: []
  },
  {
    id: 7,
    title: "Write Journal",
    icon_key: "Pencil",
    completions: []
  },
  {
    id: 8,
    title: "Drink Coffee",
    icon_key: "Coffee",
    completions: []
  },
  {
    id: 9,
    title: "Listen to Music",
    icon_key: "Music",
    completions: []
  }
]
export function HabitProvider({children}: HabitProviderProps){
  const [habits,setHabits] = useState<Habit[]>(()=>{
    const saved = localStorage.getItem('habits')
    return saved?JSON.parse(saved):initial_habits
  })
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
