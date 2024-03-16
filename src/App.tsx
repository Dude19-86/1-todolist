import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemFormType";
import {AppBar, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu as MenuIcons} from '@mui/icons-material';
import {Container, Grid, Paper} from "@material-ui/core";

export type  FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(el => el.id !== id)
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todolist: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolist]
        tasksObj[todolist] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolist: string) => {
        let tasks = tasksObj[todolist]
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const changeTaskTitle = (taskId: string, newValue: string, todolistId: string) => {
        //достаем нужный массив по todolistId
        let tasks = tasksObj[todolistId]
        // найдем нужную таску
        let task = tasks.find((t) => t.id === taskId)
        // изменим таску если она нашлась
        if (task) {
            // присваеваем новое значение
            task.title = newValue
            setTasksObj({...tasksObj})
        }
    }

    const changeTodolistTitle = (id: string, newValue: string) => {
        let todolist = todoLists.find(e => e.id === id)
        if (todolist) {
            todolist.title = newValue
            setTodoLists([...todoLists])
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(e => e.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const removeTodolist = (todolistId: string) => {
        let filteredTodoList = todoLists.filter(e => e.id !== todolistId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
        console.log(tasksObj)
    }

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todoListId1]:
            [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}],
        [todoListId2]:
            [
                {id: v1(), title: "Book", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
            ],
    })

    // let arr = useState(tasks1);
    // let tasksObj = arr[0];
    // let setTasksObj = arr[1];

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([todolist, ...todoLists])
        setTasksObj(
            {
                ...tasksObj,
                [todolist.id]: []
            })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcons/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(t => {
                        let tasksForTodolist = tasksObj[t.id];
                        if (t.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (t.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={t.id}
                                        id={t.id}
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={t.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

