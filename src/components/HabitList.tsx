export default function HabitList(){
  const habits = [
    {id:'1',title:"Hi"},
    {id:'2',title:"Bye"},
  ]
  if(habits.length===0){
    return <p className="text-center text-secondary py-12">
      No habits yet. Add one above to get started!
    </p>
  }
  return <div className="flex flex-col gap-3">
    {habits.map( habit=> <HabitItem key={habit.id} habit={habit} /> )}
  </div>
}

type HabitItemProps = {
  habit: {id:string, title:string}
}

function HabitItem({habit}: HabitItemProps){
  return (
    <div className="drop-shadow-sm rounded-xl bg-(--surface) p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{habit.title}</p>
          <span className="text-(--warning)">🔥3</span>
        </div>
        <button className="DangerBtn">Delete</button>
      </div>
      <div></div>
    </div>
  )
}