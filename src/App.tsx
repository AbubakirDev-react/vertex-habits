import { useState } from 'react'
import './App.css'
import AddHabitForm from './components/Form'
import HabitList from './components/HabitList'
import Header from './components/Header'
import type { Habit } from './types/Habit'




function App() {
  const [habits,setHabits] = useState<Habit[]>([])
  function addHabit(title: string){
    setHabits(curr=>[...curr,{id: crypto.randomUUID(),title}])
    console.log(title)
  }
  function deleteHabit(id:string){
    setHabits(curr=>curr.filter(h=>h.id!==id))
    console.log(habits.find(h=>h.id===id)?.title + ' - Habit has deleted')
  }
  return (
    <>
      <div className="app p-4 flex flex-col gap-4">
        <Header />
        <AddHabitForm addHabit={addHabit}/>
        <HabitList habits={habits} deleteHabit={deleteHabit} />
      </div>
    </>
  )
}

export default App
