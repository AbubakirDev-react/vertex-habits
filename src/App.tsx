import './App.css'
import BottomMenu from './components/BottomMenu'
import AddHabitForm from './components/Form'
import HabitList from './components/HabitList'
import Header from './components/Header'
import Dashboard from './Pages/Dashboard'




function App() {
  return (
    <>
      <div className="app p-4 flex flex-col gap-4">
        {/* <Header /> */}
        {/* <AddHabitForm/> */}
        {/* <HabitList/> */}
        <Dashboard />
      </div>
      <BottomMenu />
    </>
  )
}

export default App
