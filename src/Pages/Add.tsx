import { ArrowLeft, Moon, Footprints, BookOpen, Sparkles, Droplets, Ban,
  Dumbbell, Pencil, Coffee, Music, Bell, MoonStar, Sun } from "lucide-react";
import { useTheme } from "../context/theme.context";
import { useState, type FormEvent } from "react";


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

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Add() {
  const [name,setName] = useState('');
  const {theme,toggleTheme} = useTheme();
  const [icon,setIcon] = useState('Footprints');
  const [days, setDays] = useState([true, true, false, true, true, false, false]);
  const toggleDay = (i) => setDays(d=>d.map((v,idx)=>idx===i?v=!v:v))
  const activeDays = days.filter(Boolean).length;
  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
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
          <button key={key} className={`icon-btn ${icon===key && 'selected'}`} onClick={()=>setIcon(key)}><Icon size={18} /></button>
        ))}
        </div>
      </div>
      <div className="field">
        <label className="label">Repeat On</label>
        <div className="day-row">
          {DAYS.map((d,i)=>(
            <button className={`day-btn ${days[i] && 'selected' }`} onClick={()=>toggleDay(i)}>{d}</button>
          ))}
        </div>
        <p className="day-hint">{activeDays} day{activeDays!==1 && 's'} per week</p>
      </div>
      <div className="save-bar">
          <button className="save-btn" disabled={!name.trim()}>Create Habit</button>
        </div>
     </form>
    </div>
  )
}
