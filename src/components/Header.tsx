import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Vertex Habits</h1>
        <span className="text-secondary text-sm">1/1 done today</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-secondary text-sm">5 - 12 april</span>
        <div className="flex gap-1">
          <Button variant="primary"><ChevronLeft /></Button>
          <Button variant="primary"><ChevronRight /></Button>
        </div>
      </div>
    </header>
  )
}
