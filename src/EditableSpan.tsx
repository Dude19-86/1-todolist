import React, {ChangeEvent, useState} from "react";

class EditableSpanType {
    title;
    onchange;

    constructor(title: string, onchange: (newValue: string) => void) {
        this.title = title
        this.onchange = onchange
    }
}

export const EditableSpan = ({title, onchange}: EditableSpanType) => {
    const [editModeState, setEditModeState] = useState(false);
    const [titleInput, setTitleInput] = useState('');

    const activatedEditMode = () => {
        setEditModeState(true)
        setTitleInput(title)
    }
    const activatedViewMode = () => {
        setEditModeState(false)
        onchange(titleInput);
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    return (
        editModeState
            ? <input  onChange={onChangeInputHandler} value={titleInput} onBlur={activatedViewMode} autoFocus/>
            : <span onDoubleClick={activatedEditMode}>{title}</span>
    )
};