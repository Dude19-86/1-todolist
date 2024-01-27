import React, {useState} from "react";
import {List} from "./List";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    title: string,
    checked?: boolean,
    type?: string,
    skill?: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void
    changeFilter: (value: FilteredValuesType) => void
}


export const Todolist = (props: PropsTodolistType) => {
    const [state, setState] = useState(true);
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((e, i) => {
                        return (
                            <li key={i}>
                                <input type={"checkbox"} checked={e.isDone}/><span>{e.title}</span>
                                <button style={{backgroundColor: "lightblue", margin: " 0 15px"}} onClick={() => {
                                   props.removeTask(e.id)
                                }}> X
                                </button>
                            </li>
                        )
                    })}
                </ul>
                {/*<List type={"checkbox"} checked={true} skill={"CSS&HTML"}/>*/}
                {/*<List type={"checkbox"} checked={true} skill={"JS"}/>*/}
                {/*<List type={"checkbox"} checked={false} skill={"React"}/>*/}
                <div>
                    <button onClick={() => {
                        props.changeFilter("all")
                    }}>All</button>
                    <button onClick={() => {
                        props.changeFilter("active")
                    }}>Active</button>
                    <button onClick={() => {
                        props.changeFilter("completed")
                    }}>Completed</button>
                </div>
            </div>
        </div>
    )
}