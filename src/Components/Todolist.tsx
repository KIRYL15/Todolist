import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "../App";

type tasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
type propsType = {
    title: string
    task: tasksPropsType[]
    removeTasks: (id: string) => void
    changeFilter: (value: filterType) => void
    addTasks: (title: string) => void
    changeTaskStatus:(taskId: string, value: boolean)=>void
    filter: filterType
}

export const Todolist = (props: propsType) => {
    let [title, setTitle] = useState('')
    let [error, setError]=useState<string|null>(null)
    function addTask() {
        if (title.trim()){
            props.addTasks(title);
            setTitle('')
        }else{
            setError('Введите текст')
        }

    }

    function omChangeHandler(ch: ChangeEvent<HTMLInputElement>) {
        {
            setTitle(ch.currentTarget.value)
        }
    };

    function onPressKey(ch: KeyboardEvent<HTMLInputElement>) {setError(null); if (ch.charCode === 13) {addTask()}};
    function clickAllHendler() {props.changeFilter('all')};
    function clickAciveHendler() {props.changeFilter('active')};
    function clickComplitedHendler() {props.changeFilter('complited')};
    const styleAll = props.filter ==='all'? 'activeFilter':''
    const styleActive = props.filter ==='active'? 'activeFilter':''
    const styleCompleted = props.filter ==='complited'? 'activeFilter':''

function onChangeHandlerForStatus(currentId: string, e: ChangeEvent<HTMLInputElement>) {
    props.changeTaskStatus(currentId, e.currentTarget.checked)
}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={omChangeHandler}
                    onKeyPress={onPressKey}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>{
                props.task.map(t => {
                    const removeTasksHandler = () => props.removeTasks(t.id)
                    /*function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {props.changeTaskStatus(t.id, e.currentTarget.checked)}*/
                    return  <li className={t.isDone?'isDone':''} key={t.id}>

                        <input type="checkbox" checked={t.isDone}
                               onChange={(e)=> onChangeHandlerForStatus(t.id, e)}/>
                        <span>{t.title}</span>
                        <button onClick={removeTasksHandler}>X</button>
                    </li>
                })
            }
            </ul>
            <div>
                <button className={styleAll} onClick={clickAllHendler}>All</button>
                <button className={styleActive} onClick={clickAciveHendler}>Active</button>
                <button className={styleCompleted} onClick={clickComplitedHendler}>Completed</button>
            </div>
        </div>
    )
}