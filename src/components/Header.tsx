import { PrimaryBtn } from "./PrimaryBtn";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Vertex Habits</h1>
        <span className="text-secondary text-sm">1/1 done today</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-secondary text-sm">1/1 done today</span>
        <div className="flex gap-1">
          <PrimaryBtn>Prev</PrimaryBtn>
          <PrimaryBtn>Next</PrimaryBtn>
        </div>
      </div>
    </header>
  )
}
