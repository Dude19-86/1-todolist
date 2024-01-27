import React, {useState} from "react";
import {List} from "./List";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    title: string
    checked?: boolean
    type?: string
    skill?: string
    tasks: Array<TaskType>
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
                                    alert("click")
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}