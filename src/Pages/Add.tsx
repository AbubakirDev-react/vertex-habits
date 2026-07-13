import { ArrowLeft, MoonStar, Sun } from "lucide-react";
import { useTheme } from "../context/theme.context";
import { useState, type FormEvent } from "react";
import { useHabit } from "../context/habit.context";
import { useNavigate } from "react-router-dom";



const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Add() {
  const [name,setName] = useState('');
  const {theme,toggleTheme} = useTheme();
  const {ICON_OPTIONS, addHabit} = useHabit();
  const [icon,setIcon] = useState('Footprints');
  const navigate = useNavigate();
  const handleSubmit=(e: SubmitEvent)=>{
    e.preventDefault()
    addHabit(name,icon)
    navigate('/')
    console.log(name,icon)
  }
  return (
    <div className="page">
     <div className="header flex gap-2 items-center">
      <button className="back-btn"><ArrowLeft size={16}/></button>
      <p className="text-2xl">New Habit</p>
      <button className="theme-btn ml-auto" onClick={toggleTheme}>{theme==="dark"?<Sun size={16}/>:<MoonStar size={16}/>}</button>
     </div>
     <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name" className="label block">Habit Name</label>
        <input type="text" className="name-input" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="" className="label block">Icon</label>
        <div className="icon-grid">
          {ICON_OPTIONS.map(({key, Icon})=>(
          <button key={key} className={`icon-btn ${icon===key && 'selected'}`} onClick={()=>setIcon(key)} type="button"><Icon size={18} /></button>
        ))}
        </div>
      </div>
      <div className="save-bar">
          <button className="save-btn" disabled={!name.trim()} type="submit">Create Habit</button>
        </div>
     </form>
    </div>
  )
}
