import React, {ChangeEvent} from "react";
import {FilteredValuesType} from "./App";
import {AddItemForm} from "./AddItemFormType";
import {EditableSpan} from "./EditableSpan";

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
    tasks: TaskType[],
    removeTask: (taskId: string, todolist: string) => void
    changeFilter: (value: FilteredValuesType, todoListId: string) => void
    addTask: (title: string, todolist: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolist: string) => void
    filter: FilteredValuesType
    id: string
    removeTodolist: (todoListId: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    changeTodolistTitle: (id: string, newValue: string) => void
}

export const Todolist: React.FC<PropsTodolistType> = (props) => {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <div>
                <h3> <EditableSpan title={props.title} onchange={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.tasks.map((e) => {
                        const onRemoveHandler = () => {
                            props.removeTask(e.id, props.id)
                        }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(e.id, event.currentTarget.checked, props.id)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(e.id, newValue, props.id)
                        }
                        return (
                            <li key={e.id}
                                className={e.isDone ? 'isDone' : ''}>
                                <input type={"checkbox"}
                                       checked={e.isDone}
                                       onChange={onChangeStatusHandler}/>
                                <EditableSpan onchange={onChangeTitleHandler} title={e.title}/>
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


