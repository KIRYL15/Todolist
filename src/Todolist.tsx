import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";
type TodolistType = {
    title: string
    tasks: TasksType[]
    removeTasks: (todolistId:string, TaskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTasks: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterType
    todolistId: string
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistType) => {
    let [title, setTile] = useState('')
    let [textError, setTextError]=useState<string | null>(null)
    const addTasks = () => {
        if (title.trim() !== '') {
            props.addTasks(props.todolistId, title.trim())
            setTile('')
        }else {
            setTextError('Введите данные!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTile(e.currentTarget.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setTextError(null)
        if (e.key === 'Enter') {
            addTasks()
        }
    }
    const onClickAllHandler = () => {
        props.changeFilter(props.todolistId,'all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter(props.todolistId,'completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onPressHandler}
                       className="error"
                />
                <button onClick={addTasks}>+</button>{/*кнопка для добавления тасок*/}
                {textError && <div className='errorMessage'>{textError}</div>}
            </div>
            <div>
                <ul>
                    {props.tasks.map(ts => {
                            const onPressRemoveTasksHandler = () => {
                                props.removeTasks(props.todolistId, ts.id)
                            }
                            const onChangeTasksHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(props.todolistId, ts.id, e.currentTarget.checked)
                            }
                            return <li key={ts.id} className={ts.isDone?'isDone':''}>
                                <input type="checkbox"
                                       checked={ts.isDone}
                                       onChange={onChangeTasksHandler}/>{/*поле ввода*/}
                                <span>{ts.title}</span>{/*надпись*/}
                                <button onClick={onPressRemoveTasksHandler}>X</button>{/*кнопка для удаления тасок*/}
                            </li>
                        })}
                </ul>
            </div>
            <div>
                <button className={props.filter==='all'?'activeFilter':''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter==='active'?'activeFilter':''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter==='completed'?'activeFilter':''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
};

