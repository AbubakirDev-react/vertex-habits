import React, { useState } from "react";
import {
  Sun, Moon, Footprints, BookOpen, Sparkles, Droplets, Ban,
  LayoutGrid, BarChart2, Settings, Flame, Plus, ListChecks
} from "lucide-react";

const ICONS = { Footprints, BookOpen, Sparkles, Droplets, Ban };

const INITIAL_HABITS = [
  { id: 1, name: "Morning Run", icon: "Footprints", streak: 12, done: true, week: [1,1,0,1,1,1,0] },
  { id: 2, name: "Read 20 Pages", icon: "BookOpen", streak: 34, done: true, week: [1,1,1,1,1,0,0] },
  { id: 3, name: "Meditate", icon: "Sparkles", streak: 5, done: false, week: [1,0,1,1,0,0,0] },
  { id: 4, name: "Drink Water", icon: "Droplets", streak: 60, done: true, week: [1,1,1,1,1,1,1] },
  { id: 5, name: "No Sugar", icon: "Ban", streak: 2, done: false, week: [0,0,1,1,0,0,0] },
];

function GrowthRing({ size = 52, stroke = 5, progress = 0, accent, track }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r - 8} fill="none" stroke={track} strokeWidth="1" strokeDasharray="1.5 4" opacity="0.6" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={accent} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "habits", label: "Habits", icon: ListChecks },
  { id: "stats", label: "Stats", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("dashboard");
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleHabit = (id) => {
    setHabits(hs => hs.map(h => h.id === id
      ? { ...h, done: !h.done, streak: h.done ? Math.max(0, h.streak - 1) : h.streak + 1 }
      : h
    ));
  };

  const total = habits.length;
  const doneCount = habits.filter(h => h.done).length;
  const progress = total ? doneCount / total : 0;
  const bestStreak = Math.max(...habits.map(h => h.streak));
  const rate = Math.round((habits.reduce((s,h) => s + h.week.reduce((a,b)=>a+b,0), 0) / (total*7)) * 100);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div data-theme={theme} className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap');

        [data-theme="dark"] {
          --bg:#0B0B0F; --bg-secondary:#111116; --bg-hover:#17171D;
          --surface:#15151B; --surface-hover:#1C1C24;
          --border:#24242C; --border-hover:#303039;
          --primary:#6C63FF; --primary-hover:#7D75FF; --on-primary:#FFFFFF;
          --text:#F2F2F5; --text-secondary:#A0A0AC; --text-tertiary:#6B6B76;
          --success:#4ADE80;
        }
        [data-theme="light"] {
          --bg:#FFFFFF; --bg-secondary:#F7F7F9; --bg-hover:#F0F0F3;
          --surface:#FFFFFF; --surface-hover:#F5F5F8;
          --border:#E4E4EA; --border-hover:#D1D1D9;
          --primary:#5B52E0; --primary-hover:#4A42C9; --on-primary:#FFFFFF;
          --text:#14141A; --text-secondary:#55555F; --text-tertiary:#85858F;
          --success:#16A34A;
        }

        .app-root { background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; min-height:600px; width:100%; }
        .shell { display:flex; min-height:600px; }

        /* Sidebar — hidden below md */
        .sidebar {
          display:none; width:220px; flex-shrink:0; border-right:1px solid var(--border);
          padding:24px 16px; flex-direction:column; gap:4px;
        }
        .brand { font-family:'Fraunces',serif; font-size:19px; font-weight:600; margin:0 0 28px 8px; }
        .nav-item {
          display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px;
          color:var(--text-secondary); font-size:14px; font-weight:500; cursor:pointer; border:none; background:none; text-align:left;
        }
        .nav-item.active { background:var(--surface-hover); color:var(--text); }
        .nav-item:hover { background:var(--bg-hover); }
        .sidebar-bottom { margin-top:auto; }

        .main { flex:1; min-width:0; padding: 16px; }
        @media (min-width:480px){ .main{ padding:20px; } }
        @media (min-width:768px){ .main{ padding:32px; } .sidebar{ display:flex; } }
        @media (min-width:1024px){ .main{ padding:48px; } }

        .content { max-width:100%; }
        @media (min-width:1024px){ .content{ max-width:1080px; } }

        .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; }
        .greeting { font-family:'Fraunces',serif; font-size:24px; font-weight:600; margin:0; }
        @media (min-width:768px){ .greeting{ font-size:28px; } }
        .date { font-size:13px; color:var(--text-secondary); margin-top:4px; }
        .theme-btn {
          width:36px; height:36px; border-radius:50%; border:1px solid var(--border); background:var(--surface);
          display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--text);
        }

        /* Stat cards — 1 col xs, 2 col sm, 3 col md+ */
        .stats-grid { display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:28px; }
        @media (min-width:480px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (min-width:768px){ .stats-grid{ grid-template-columns:repeat(3,1fr); gap:16px; } }

        .stat-card {
          background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px;
          display:flex; align-items:center; gap:14px;
        }
        .stat-num { font-family:'JetBrains Mono',monospace; font-size:20px; font-weight:700; }
        .stat-label { font-size:12px; color:var(--text-secondary); margin-top:2px; }

        .section-title {
          font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-tertiary);
          margin:0 0 14px 2px; font-weight:600;
        }

        /* Habit grid — 1 col xs/sm, 2 col md, 3 col lg */
        .habit-grid { display:grid; grid-template-columns:1fr; gap:12px; }
        @media (min-width:768px){ .habit-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (min-width:1024px){ .habit-grid{ grid-template-columns:repeat(3,1fr); gap:16px; } }

        .habit-card {
          background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:16px;
          display:flex; align-items:center; gap:14px; cursor:pointer; transition:border-color .15s, background .15s;
        }
        .habit-card:hover { background:var(--surface-hover); border-color:var(--border-hover); }
        .ring-wrap { position:relative; width:52px; height:52px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .ring-icon { position:absolute; }
        .habit-body { flex:1; min-width:0; }
        .habit-name { font-size:14.5px; font-weight:600; margin:0 0 6px; }
        .week { display:flex; gap:4px; }
        .dot { width:6px; height:6px; border-radius:50%; background:var(--border); }
        .dot.filled { background:var(--success); }
        .streak { display:flex; align-items:center; gap:4px; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; color:var(--primary); flex-shrink:0; }

        /* Mobile tab bar — hidden at md+ */
        .tabbar {
          display:flex; justify-content:space-around; align-items:center; height:64px;
          border-top:1px solid var(--border); background:var(--surface); position:sticky; bottom:0;
        }
        @media (min-width:768px){ .tabbar{ display:none; } }
        .tab-btn { background:none; border:none; color:var(--text-tertiary); display:flex; flex-direction:column; align-items:center; gap:2px; font-size:10px; cursor:pointer; }
        .tab-btn.active { color:var(--primary); }

        .fab {
          width:44px; height:44px; border-radius:50%; background:var(--primary); color:var(--on-primary);
          display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; flex-shrink:0;
        }
      `}</style>

      <div className="shell">
        <aside className="sidebar">
          <p className="brand">Habitual</p>
          {NAV.map(n => {
            const Icon = n.icon;
            return (
              <button key={n.id} className={`nav-item ${active===n.id ? "active" : ""}`} onClick={() => setActive(n.id)}>
                <Icon size={16} /> {n.label}
              </button>
            );
          })}
          <div className="sidebar-bottom">
            <button className="nav-item" onClick={() => setTheme(t => t==="dark"?"light":"dark")}>
              {theme==="dark" ? <Sun size={16}/> : <Moon size={16}/>} {theme==="dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="content">
            <div className="header">
              <div>
                <p className="greeting">Good morning</p>
                <p className="date">{today}</p>
              </div>
              <button className="theme-btn" onClick={() => setTheme(t => t==="dark"?"light":"dark")}>
                {theme==="dark" ? <Sun size={16}/> : <Moon size={16}/>}
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <GrowthRing size={48} stroke={4} progress={progress} accent="var(--primary)" track="var(--border)" />
                <div><div className="stat-num">{doneCount}/{total}</div><div className="stat-label">Completed today</div></div>
              </div>
              <div className="stat-card">
                <Flame size={22} color="var(--primary)" />
                <div><div className="stat-num">{bestStreak}</div><div className="stat-label">Best streak</div></div>
              </div>
              <div className="stat-card">
                <BarChart2 size={22} color="var(--primary)" />
                <div><div className="stat-num">{rate}%</div><div className="stat-label">7-day completion</div></div>
              </div>
            </div>

            <p className="section-title">Today's Habits</p>
            <div className="habit-grid">
              {habits.map(h => {
                const Icon = ICONS[h.icon];
                return (
                  <div className="habit-card" key={h.id} onClick={() => toggleHabit(h.id)}>
                    <div className="ring-wrap">
                      <GrowthRing size={52} stroke={4} progress={h.done?1:0} accent="var(--success)" track="var(--border)" />
                      <Icon size={18} className="ring-icon" color="var(--text)" />
                    </div>
                    <div className="habit-body">
                      <p className="habit-name">{h.name}</p>
                      <div className="week">{h.week.map((d,i) => <span key={i} className={`dot ${d?"filled":""}`} />)}</div>
                    </div>
                    <div className="streak"><Flame size={12}/>{h.streak}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <div className="tabbar">
        {NAV.map(n => {
          const Icon = n.icon;
          return (
            <button key={n.id} className={`tab-btn ${active===n.id?"active":""}`} onClick={() => setActive(n.id)}>
              <Icon size={18} />{n.label}
            </button>
          );
        })}
        <button className="fab"><Plus size={18} /></button>
      </div>
    </div>
  );
}