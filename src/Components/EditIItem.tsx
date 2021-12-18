import React, {useState} from 'react';

type EditIItemType = {
    title: string
}

export const EditItem = (props: EditIItemType) => {

    let [localTitle, setLocalTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(true)
    const onDoubleClickHandler = () => {
        setEditMode(!editMode)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <span onDoubleClick={onDoubleClickHandler}>{localTitle}</span>
            : <input onChange={onChangeHandler} autoFocus onBlur={onDoubleClickHandler} value={localTitle}/>
    );
};

