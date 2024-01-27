import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type  FilteredValuesType = "all" | "completed" | "active";

function App() {



    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])
    let [filter, setFilter] =  useState<FilteredValuesType>("all")

    function changeFilter(value: FilteredValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone)
        }
        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => !t.isDone)
        }


    // let arr = useState(tasks1);
    // let tasks = arr[0];
    // let setTasks = arr[1];


    const removeTask = (id: number) => {
        return setTasks(tasks.filter(el => el.id !== id))
        // let filteredTasks = tasks.filter(el => el.id !== id)
        // setTasks(filteredTasks)
        // console.log(filteredTasks)
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

