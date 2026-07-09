  import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
  import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

  type Context = {
    visibleDates: Date[]
    next: () => void
    prev: () => void
  }

  const datesContext  = createContext<null | Context>(null);

  type DateProps = {
    children: ReactNode
  }

  export function DatesProvider({children}: DateProps){
    const [weekOffset, setWeekOffset] = useState(()=>{
      const saved = localStorage.getItem('weekOffset')
      return saved?Number(saved):0
    })
    useEffect(() => {
      localStorage.setItem('weekOffset', String(weekOffset))
    }, [weekOffset])
    const week = addWeeks(new Date(),weekOffset)
    const visibleDates = eachDayOfInterval({
      start: startOfWeek(week),
      end: endOfWeek(week)
    })
    function next(){
      setWeekOffset(prev=>prev+1)
    }
    function prev(){
      setWeekOffset(prev=>prev-1)
    }
    return (
      <datesContext.Provider value={{ visibleDates,next,prev }}>{children}</datesContext.Provider>
    )
  }

  export function useDates(){
    const context = useContext(datesContext)
    if(context===null){ throw new Error('dates context null!')}
    return context
  }