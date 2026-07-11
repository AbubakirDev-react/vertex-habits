import { AlignEndHorizontalIcon,  LayoutGrid, ListChecks, Plus, Settings } from "lucide-react";
import { useState } from "react";




export default function BottomMenu(){
  const [activeLink,setActiveLink] = useState('dashboard')
  const links = [
    {
      id:'dashboard',
      label:'Dashboard',
      icon: <LayoutGrid size={20} />
    },
    {
      id:'habits',
      label:'Habits',
      icon: <ListChecks size={20} />
    },
    {
      id:'stats',
      label:'Stats',
      icon: <AlignEndHorizontalIcon size={20} />
    },
    {
      id:'settings',
      label:'Settings',
      icon: <Settings size={20} />
    },
  ]

  return(
    <nav className="w-full left-0 bottom-0 fixed bg-(--surface)  flex gap-2 items-center p-2">
      <ul className="w-full flex gap-2 items-center justify-evenly">
        {links.map((link)=>{
          return <li key={link.id}>
            <a onClick={()=>setActiveLink(link.id)} href="#" className={`flex flex-col items-center text-sm ${link.id===activeLink && 'text-(--primary)'}`}>
              {link.icon}
              <span className="text-xs">{link.label}</span>
            </a>
          </li>
        })}
       <a href="#" className="p-3 bg-(--primary) rounded-full"><Plus size={20}/></a>
      </ul>
    </nav>
  )
}