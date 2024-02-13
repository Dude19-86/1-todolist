import React, {ChangeEvent, useState} from "react";
import {FilteredValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    title: string,
    checked?: boolean,
    type?: string,
    skill?: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void
    changeFilter: (value: FilteredValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilteredValuesType
}

export const Todolist: React.FC<PropsTodolistType> = (props) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.code === "Enter") {
            props.addTask(title)
            setTitle("")
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyUp={onKeyPressHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((e) => {
                        const onRemoveHandler = () => {
                            props.removeTask(e.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(e.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={e.id}
                                className={e.isDone ? 'isDone' : ''}>
                                <input type={"checkbox"}
                                       checked={e.isDone}
                                       onChange={onChangeHandler}/>
                                <span>{e.title}</span>
                                <button style={{backgroundColor: "lightblue", margin: " 0 15px"}}
                                        onClick={onRemoveHandler}> X
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}