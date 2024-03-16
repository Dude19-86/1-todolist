import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemFormType";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core"
import Delete from "@mui/icons-material/Delete";

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
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolist: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolist: string) => void
    filter: FilterValuesType
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
                <h3><EditableSpan title={props.title} onchange={changeTodolistTitle}/>
                    {/*<button onClick={removeTodolist}>x</button>*/}
                    <IconButton aria-label={'delete'} onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
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
                            <div key={e.id}
                                className={e.isDone ? 'isDone' : ''}>
                                <Checkbox
                                    checked={e.isDone}
                                    onChange={onChangeStatusHandler}
                                    // icon={<BookmarkBorderIcon />}
                                    // checkedIcon={<BookmarkIcon />}
                                />

                                {/*<Checkbox icon={e.isDone && <FavoriteBorder/>}*/}
                                {/*           checkedIcon={!e.isDone && <Favorite/>}*/}
                                {/*/>*/}

                                <EditableSpan onchange={onChangeTitleHandler} title={e.title}/>
                                {/*<button style={{backgroundColor: "lightblue", margin: " 0 15px"}}*/}
                                {/*        onClick={onRemoveHandler}> X*/}
                                {/*</button>*/}

                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                            color={'primary'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                            color={'secondary'}
                            className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}












