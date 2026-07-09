import './App.css'
import AddHabitForm from './components/Form'
import HabitList from './components/HabitList'
import Header from './components/Header'




function App() {
  
  return (
    <>
      <div className="app p-4 flex flex-col gap-4">
        <Header />
        <AddHabitForm/>
        <HabitList/>
      </div>
    </>
  )
}

export default App
