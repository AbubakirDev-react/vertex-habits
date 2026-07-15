import React, { useState } from "react";
import {
  Sun, Moon, Footprints, BookOpen, Sparkles, Droplets, Ban,
  LayoutGrid, BarChart2, Settings, Flame, Plus, ListChecks, type LucideIcon,
} from "lucide-react";
import './habitspage.css';
/* ── Types ─────────────────────────────────────────────────────── */

type IconName = "Footprints" | "BookOpen" | "Sparkles" | "Droplets" | "Ban";

interface Habit {
  id: number;
  name: string;
  icon: IconName;
  streak: number;
  done: boolean;
  /** Mon → Sun, 1 = completed that day */
  week: (0 | 1)[];
}

type Theme = "dark" | "light";
type NavId = "dashboard" | "habits" | "stats" | "settings";

interface NavEntry {
  id: NavId;
  label: string;
  icon: LucideIcon;
}

const ICONS: Record<IconName, LucideIcon> = {
  Footprints, BookOpen, Sparkles, Droplets, Ban,
};

const NAV: NavEntry[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "habits", label: "Habits", icon: ListChecks },
  { id: "stats", label: "Stats", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const INITIAL_HABITS: Habit[] = [
  { id: 1, name: "Morning Run", icon: "Footprints", streak: 12, done: true, week: [1, 1, 0, 1, 1, 1, 0] },
  { id: 2, name: "Read 20 Pages", icon: "BookOpen", streak: 34, done: true, week: [1, 1, 1, 1, 1, 0, 0] },
  { id: 3, name: "Meditate", icon: "Sparkles", streak: 5, done: false, week: [1, 0, 1, 1, 0, 0, 0] },
  { id: 4, name: "Drink Water", icon: "Droplets", streak: 60, done: true, week: [1, 1, 1, 1, 1, 1, 1] },
  { id: 5, name: "No Sugar", icon: "Ban", streak: 2, done: false, week: [0, 0, 1, 1, 0, 0, 0] },
];

/* ── GrowthRing ────────────────────────────────────────────────── */

interface GrowthRingProps {
  size?: number;
  stroke?: number;
  progress: number; // 0–1
  accent: string;
  track: string;
}

function GrowthRing({ size = 52, stroke = 5, progress, accent, track }: GrowthRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r - 8} fill="none" stroke={track} strokeWidth={1} strokeDasharray="1.5 4" opacity={0.6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}

/* ── HabitCard ─────────────────────────────────────────────────── */

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: number) => void;
}

function HabitCard({ habit, onToggle }: HabitCardProps) {
  const Icon = ICONS[habit.icon];
  return (
    <div className="habit-card" onClick={() => onToggle(habit.id)}>
      <div className="ring-wrap">
        <GrowthRing size={52} stroke={4} progress={habit.done ? 1 : 0} accent="var(--success)" track="var(--border)" />
        <Icon size={18} className="ring-icon" color="var(--text)" />
      </div>
      <div className="habit-body">
        <p className="habit-name">{habit.name}</p>
        <div className="week">
          {habit.week.map((d, i) => (
            <span key={i} className={`dot ${d ? "filled" : ""}`} />
          ))}
        </div>
      </div>
      <div className="streak">
        <Flame size={12} />
        {habit.streak}
      </div>
    </div>
  );
}

/* ── HabitsPage (default export) ──────────────────────────────────
   Full dashboard: sidebar nav on md+, bottom tab bar on mobile,
   stat cards + a reflowing grid of habit cards.
   ────────────────────────────────────────────────────────────── */

export default function HabitsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<NavId>("habits");
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const toggleHabit = (id: number): void => {
    setHabits((hs) =>
      hs.map((h) =>
        h.id === id
          ? { ...h, done: !h.done, streak: h.done ? Math.max(0, h.streak - 1) : h.streak + 1 }
          : h
      )
    );
  };

  const total = habits.length;
  const doneCount = habits.filter((h) => h.done).length;
  const progress = total ? doneCount / total : 0;
  const bestStreak = total ? Math.max(...habits.map((h) => h.streak)) : 0;
  const rate = total
    ? Math.round((habits.reduce((s, h) => s + h.week.reduce((a, b) => a + b, 0), 0) / (total * 7)) * 100)
    : 0;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div data-theme={theme} className="app-root">
      <div className="shell">
        <aside className="sidebar">
          <p className="brand">Habitual</p>
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                className={`nav-item ${active === n.id ? "active" : ""}`}
                onClick={() => setActive(n.id)}
              >
                <Icon size={16} /> {n.label}
              </button>
            );
          })}
          <div className="sidebar-bottom">
            <button className="nav-item" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
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
              <button
                className="theme-btn"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <GrowthRing size={48} stroke={4} progress={progress} accent="var(--primary)" track="var(--border)" />
                <div>
                  <div className="stat-num">
                    {doneCount}/{total}
                  </div>
                  <div className="stat-label">Completed today</div>
                </div>
              </div>
              <div className="stat-card">
                <Flame size={22} color="var(--primary)" />
                <div>
                  <div className="stat-num">{bestStreak}</div>
                  <div className="stat-label">Best streak</div>
                </div>
              </div>
              <div className="stat-card">
                <BarChart2 size={22} color="var(--primary)" />
                <div>
                  <div className="stat-num">{rate}%</div>
                  <div className="stat-label">7-day completion</div>
                </div>
              </div>
            </div>

            <p className="section-title">Today's Habits</p>
            <div className="habit-grid">
              {habits.map((h) => (
                <HabitCard key={h.id} habit={h} onToggle={toggleHabit} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="tabbar">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              className={`tab-btn ${active === n.id ? "active" : ""}`}
              onClick={() => setActive(n.id)}
            >
              <Icon size={18} />
              {n.label}
            </button>
          );
        })}
        <button className="fab" aria-label="Add habit">
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}