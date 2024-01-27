import React from 'react';
type PropsListType = {
    type: string
    checked: boolean
    skill: string
}
export const List = (props: PropsListType) => {
    return (
        <ul>
            <li><input type={props.type} checked={props.checked}/> <span>{props.skill}</span></li>
        </ul>
    );
};