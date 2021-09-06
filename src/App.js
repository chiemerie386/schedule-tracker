import { useState, useEffect} from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
// let x = "false"
const [showAddTask, SetShowAddTask] = useState(false)
const [tasks, setTasks] = useState([])

const fetchTasks = async ()=>{
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}
const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}
useEffect(()=>{
  const getTasks = async () =>{
    const existingTasks = await fetchTasks()
    setTasks(existingTasks)
  }
  getTasks() 
}, [])



//Delete Tasks
const deleteTask = async (id)=> {
await fetch (`http://localhost:5000/tasks/${id}`, {
  method : 'DELETE',
})



  // setTasks(tasks.filter((task)=> task.id !== id))
  // console.log("delete",id);
}

//Set Reminder
const toggleReminder = async (id) => {
  const oldTask = await fetchTask(id)
  const updTask = {...oldTask, reminder : !oldTask.reminder}

  // const res = 
  await fetch (`http://localhost:5000/tasks/${id}`,{
    method : 'PUT',
    headers : {
      'Content-type' : 'Application/json'
    },
    body : JSON.stringify(updTask)
  })
  // const data = await res.json()

  setTasks(tasks.map((task)=> {
    if(task.id === id){
      
      task.reminder = !task.reminder
      
    }
    return task
  }))

  console.log("reminder", tasks[id-1], id);
}

//Add tasks

const addTask = async (task)=>{
  const id = Math.floor(Math.random()* 1000000) 
  const newTask = {id,...task}
  const res = await fetch (`http://localhost:5000/tasks`, {
    method : 'POST',
    headers :{'Content-type' : 'application/json'},
    body :JSON.stringify(newTask)
    
  })
  
const data = await res.json()
setTasks([...tasks, data])


//   const id = Math.floor(Math.random()* 1000000) 
// const newTask = {id,...task}

// setTasks([...tasks, newTask])
  // console.log(task);
}

  return (
    <Router>
        <div className="container">
        <Header body="Schedule Tracker" onAdd = {()=>SetShowAddTask(!showAddTask)} showAddTask= {showAddTask}/>
            <Route path = '/' exact render= {((props)=>
        
          <>
             {showAddTask && <AddTask onAdd = {addTask}/>}
            {tasks.length > 0 ?<Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/> : "You Dont Have Schedules"}
   
          </>
        
        )} />
      <Route path = '/about' component = {About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;