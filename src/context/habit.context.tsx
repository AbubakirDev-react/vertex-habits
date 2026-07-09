import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Habit } from "../types"
import { isSameDay } from "date-fns"



type Context = {
  habits: Habit[]
  addHabit: (title: string) => void
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

  useEffect(()=>{
    localStorage.setItem('habits',JSON.stringify(habits))
  },[habits])

  function addHabit(title: string){
    setHabits(prev=>[...prev,{id: crypto.randomUUID(),title, completions:[]}])
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

  return <HabitContext.Provider value={{habits,toggleHabit,deleteHabit,addHabit}}>{children}</HabitContext.Provider>
}

export function useHabit(){
  const context = useContext(HabitContext)
  return context
}