import { AlignEndHorizontalIcon,  LayoutGrid, ListChecks, Plus, Settings } from "lucide-react";
import { useState } from "react";
import {  Link } from "react-router-dom";




export default function BottomMenu(){
  const [activeLink,setActiveLink] = useState('dashboard')
  const links = [
    {
      id:'dashboard',
      label:'Dashboard',
      icon: <LayoutGrid size={20} />,
      href: '/'
    },
    {
      id:'habits',
      label:'Habits',
      icon: <ListChecks size={20} />,
      href:'habits',
    },
    {
      id:'stats',
      label:'Stats',
      icon: <AlignEndHorizontalIcon size={20} />,
      href:'stats',
    },
    {
      id:'settings',
      label:'Settings',
      icon: <Settings size={20} />,
      href: 'settings'
    },
  ]

  return(
    <nav className="w-full left-0 bottom-0 fixed bg-(--surface)">
      <ul className="w-full flex gap-2 items-center justify-evenly">
        {links.map((link)=>{
          return <li key={link.id}>
            <Link to={link.href} onClick={()=>setActiveLink(link.id)} className={`flex flex-col items-center p-3 text-sm ${link.id===activeLink && 'text-(--primary)'}`}>
              {link.icon}
              <span className="text-xs">{link.label}</span>
            </Link>
          </li>
        })}
       <Link to={'add-habit'} className="p-3 bg-(--primary) rounded-full"><Plus size={20}/></Link>
      </ul>
    </nav>
  )
}