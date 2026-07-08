import type { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

export function PrimaryBtn({children}: ButtonProps){
  return <button className={`primary-btn shadow  disabled:opacity-30 disabled:cursor-not-allowed`}>{children}</button>
}