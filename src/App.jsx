import { useState } from 'react'
import './App.css'
import TaskManager from './Task/taskManager'
import TimerImplementationLogic from './Timer/timerImplementation'

function App() {
  
  const [selectedTask,setSelectedTask] = useState(null);
  const [autoReload,setAutoReload] = useState(false);
  return (
    <div>
        <h1>Focus Flow</h1>
        <TimerImplementationLogic selectedTask = {selectedTask} 
                                  setAutoReload={setAutoReload}
                                  setSelectedTask={setSelectedTask}
                                 
        ></TimerImplementationLogic>
        <TaskManager 
                                  setSelectedTask={setSelectedTask}
                                  autoReload={autoReload}
                                  ></TaskManager>
    </div>
  )
}

export default App
