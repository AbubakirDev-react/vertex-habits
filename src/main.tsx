import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HabitProvider } from './context/habit.context.tsx'
import { DatesProvider } from './context/dates.context.tsx'
import ThemeProvider from './context/theme.context.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <DatesProvider>
      <HabitProvider>
        <RouterProvider router={router} />
      </HabitProvider>
    </DatesProvider>
    </ThemeProvider>
  </StrictMode>,
)
