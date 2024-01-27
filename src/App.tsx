import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


function App() {

    const [state, setState] = useState(false);
    const checkBoxChanged = () => setState(!state);
    let tasks1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React", isDone: false},
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "XXX", isDone: false},
        {id: 3, title: "Gentlemen of Fortune", isDone: false},
        {id: 4, title: "Gentlemen of Fortune", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1} />
            <Todolist title={"Name"} tasks={tasks2}/>
        </div>
    );
}

export default App;

