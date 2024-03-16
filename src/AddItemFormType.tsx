import React, {useState} from "react";
import {Button, Input, TextField} from "@material-ui/core";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton/IconButton";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.code === "Enter") {
            props.addItem(title)
            setTitle("")
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField
                label={'Type Value'}
                variant={'outlined'}
                color={'primary'}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton  color={'primary'}  onClick={addTask}><ControlPoint/></IconButton>
        </div>
    );
};