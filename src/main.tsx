import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HabitProvider } from './context/habit.context.tsx'
import { DatesProvider } from './context/dates.context.tsx'
import ThemeProvider from './context/theme.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <DatesProvider>
      <HabitProvider>
        <App />
      </HabitProvider>
    </DatesProvider>
    </ThemeProvider>
  </StrictMode>,
)
