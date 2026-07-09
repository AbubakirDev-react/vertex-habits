
import { useState, type FormEvent } from "react";
import Button from "./ui/Button";
import { useHabit } from "../context/habit.context";


export default function AddHabitForm(){
  const [title,setTitle] = useState("");
  const {addHabit} = useHabit()
  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(title.trim()==="") return
    addHabit(title)

    setTitle("")
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} className="add-habit-input flex-1 shadow w-full py-2 px-4 outline-0 focus-visible:ring-2 focus-visible:ring-(--primary)" type="text" placeholder="New habit..."/>
      <Button variant="primary" className="rounded-xl px-4 py-2" disabled={title.trim()===""}>Add Habit</Button>
    </form>
  );
}