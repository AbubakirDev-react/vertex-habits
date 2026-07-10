import { createContext, useContext, useEffect, useState, type Component, type ReactNode } from "react"

type Context = {
  theme: string
}

const ThemeContext = createContext<null | Context>(null)


type ThemeProviderProps = {
  children: ReactNode
}
export default function ThemeProvider({children}: ThemeProviderProps){
  const [theme,setTheme] = useState(()=>{
    const saved = localStorage.getItem('theme')
    return saved?saved:"dark"
  })
  useEffect(()=>{
    localStorage.setItem('theme',theme)
    document.querySelector('body')?.setAttribute('data-theme',theme)
  },[theme])
  function toggleTheme(){
    setTheme(theme==="dark"?"light":"dark")
  }

  return(
    <ThemeContext.Provider value={{ theme,toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(){
  const context = useContext(ThemeContext)
  if(!context){
    throw new Error('Theme context null!')
  }
  return context
}