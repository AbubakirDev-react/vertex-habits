import { PrimaryBtn } from "./PrimaryBtn";

export default function AddHabitForm(){
  return (
    <form action="" className="w-full p-3 flex gap-2">
      <input className="add-habit-input shadow w-full py-1.5 px-3 outline-0 focus-visible:ring-2 focus-visible:ring-(--primary)" type="text" placeholder="New habit..."/>
      <PrimaryBtn>Add</PrimaryBtn>
    </form>
  );
}