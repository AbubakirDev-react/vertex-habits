import React, { useState } from "react";
import {
  ArrowLeft, Sun, Moon, Footprints, BookOpen, Sparkles, Droplets, Ban,
  Dumbbell, Pencil, Coffee, Music, Bell
} from "lucide-react";

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

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Footprints");
  const [days, setDays] = useState([true, true, false, true, true, false, false]);
  const [reminder, setReminder] = useState(false);
  const [time, setTime] = useState("08:00");

  const toggleDay = (i) => setDays(d => d.map((v, idx) => idx === i ? !v : v));
  const activeDays = days.filter(Boolean).length;

  return (
    <div data-theme={theme} className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500,600&family=Inter:wght@400;500;600;700&display=swap');

        [data-theme="dark"] {
          --bg:#0B0B0F; --bg-secondary:#111116; --bg-hover:#17171D;
          --surface:#15151B; --surface-hover:#1C1C24;
          --border:#24242C; --border-hover:#303039;
          --primary:#6C63FF; --primary-hover:#7D75FF; --on-primary:#FFFFFF;
          --text:#F2F2F5; --text-secondary:#A0A0AC; --text-tertiary:#6B6B76;
          --danger:#F87171;
        }
        [data-theme="light"] {
          --bg:#FFFFFF; --bg-secondary:#F7F7F9; --bg-hover:#F0F0F3;
          --surface:#FFFFFF; --surface-hover:#F5F5F8;
          --border:#E4E4EA; --border-hover:#D1D1D9;
          --primary:#5B52E0; --primary-hover:#4A42C9; --on-primary:#FFFFFF;
          --text:#14141A; --text-secondary:#55555F; --text-tertiary:#85858F;
          --danger:#DC2626;
        }

        .app-root { background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; min-height:600px; width:100%; }

        .page { padding:16px 16px 90px; max-width:100%; margin:0 auto; }
        @media (min-width:480px){ .page{ padding:20px 20px 90px; } }
        @media (min-width:768px){ .page{ padding:40px 32px 40px; max-width:560px; } }

        .header { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
        .back-btn, .theme-btn {
          width:36px; height:36px; border-radius:50%; border:1px solid var(--border); background:var(--surface);
          display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--text); flex-shrink:0;
        }
        .title { font-family:'Fraunces',serif; font-size:22px; font-weight:600; margin:0; flex:1; }
        @media (min-width:768px){ .title{ font-size:26px; } }

        .field { margin-bottom:26px; }
        .label { display:block; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-tertiary); margin-bottom:10px; }

        .name-input {
          width:100%; box-sizing:border-box; background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:14px 16px; color:var(--text); font-size:15px; font-family:'Inter',sans-serif;
          outline:none; transition:border-color .15s;
        }
        .name-input::placeholder { color:var(--text-tertiary); }
        .name-input:focus { border-color:var(--primary); }

        .icon-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
        @media (min-width:480px){ .icon-grid{ grid-template-columns:repeat(6,1fr); } }
        .icon-btn {
          aspect-ratio:1; border-radius:12px; border:1px solid var(--border); background:var(--surface);
          display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--text-secondary);
          transition:border-color .15s, color .15s, background .15s;
        }
        .icon-btn.selected { border-color:var(--primary); color:var(--primary); background:var(--surface-hover); }

        .day-row { display:flex; gap:8px; }
        .day-btn {
          flex:1; aspect-ratio:1; max-width:44px; border-radius:50%; border:1px solid var(--border); background:var(--surface);
          display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:13px; font-weight:600; color:var(--text-secondary);
          transition:border-color .15s, color .15s, background .15s;
        }
        .day-btn.selected { background:var(--primary); border-color:var(--primary); color:var(--on-primary); }
        .day-hint { font-size:12.5px; color:var(--text-secondary); margin-top:10px; }

        .reminder-row {
          display:flex; align-items:center; justify-content:space-between; background:var(--surface);
          border:1px solid var(--border); border-radius:12px; padding:14px 16px;
        }
        .reminder-left { display:flex; align-items:center; gap:10px; font-size:14.5px; font-weight:500; }
        .switch { width:42px; height:24px; border-radius:999px; background:var(--border); position:relative; cursor:pointer; border:none; flex-shrink:0; transition:background .15s; }
        .switch.on { background:var(--primary); }
        .switch-knob { position:absolute; top:2px; left:2px; width:20px; height:20px; border-radius:50%; background:var(--on-primary); transition:transform .15s; }
        .switch.on .switch-knob { transform:translateX(18px); }
        .time-input {
          margin-top:12px; width:100%; box-sizing:border-box; background:var(--bg-secondary); border:1px solid var(--border);
          border-radius:10px; padding:10px 12px; color:var(--text); font-size:14px; font-family:'Inter',sans-serif; outline:none;
        }

        .save-bar { position:sticky; bottom:0; padding-top:12px; background:linear-gradient(to top, var(--bg) 60%, transparent); }
        .save-btn {
          width:100%; padding:15px; border-radius:12px; border:none; background:var(--primary); color:var(--on-primary);
          font-size:15px; font-weight:600; cursor:pointer; transition:background .15s;
        }
        .save-btn:hover { background:var(--primary-hover); }
        .save-btn:disabled { opacity:0.4; cursor:not-allowed; }
      `}</style>

      <div className="page">
        <div className="header">
          <button className="back-btn"><ArrowLeft size={16} /></button>
          <p className="title">New Habit</p>
          <button className="theme-btn" onClick={() => setTheme(t => t==="dark"?"light":"dark")}>
            {theme==="dark" ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
        </div>

        <div className="field">
          <label className="label">Habit name</label>
          <input
            className="name-input"
            placeholder="e.g. Morning Run"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Icon</label>
          <div className="icon-grid">
            {ICON_OPTIONS.map(({ key, Icon }) => (
              <button
                key={key}
                className={`icon-btn ${icon===key ? "selected" : ""}`}
                onClick={() => setIcon(key)}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Repeat on</label>
          <div className="day-row">
            {DAYS.map((d, i) => (
              <button key={i} className={`day-btn ${days[i] ? "selected" : ""}`} onClick={() => toggleDay(i)}>
                {d}
              </button>
            ))}
          </div>
          <p className="day-hint">{activeDays} day{activeDays !== 1 ? "s" : ""} per week</p>
        </div>

        <div className="field">
          <label className="label">Reminder</label>
          <div className="reminder-row">
            <div className="reminder-left"><Bell size={16} color="var(--text-secondary)" /> Daily reminder</div>
            <button className={`switch ${reminder ? "on" : ""}`} onClick={() => setReminder(r => !r)}>
              <span className="switch-knob" />
            </button>
          </div>
          {reminder && (
            <input type="time" className="time-input" value={time} onChange={e => setTime(e.target.value)} />
          )}
        </div>

        <div className="save-bar">
          <button className="save-btn" disabled={!name.trim()}>Create Habit</button>
        </div>
      </div>
    </div>
  );
}