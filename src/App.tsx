import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'complited'

export function App() {
    let [task, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
        ])

    function changeStatus(taskId: string, value: boolean) {
        console.log(taskId)
        setTasks(task.map(m=>m.id===taskId ? {...m, isDone: value} : m))
    }

    function removeTasks(taskId: string) {setTasks(task.filter(t => t.id !== taskId))}
    function addTasks(title: string) {setTasks([{id: v1(), title: title.trim(), isDone: true}, ...task])}
    function changeFilter(value: filterType) {setFilter(value)}

    //метод мап лучше использовать, чем find
/*
        let tasks=task.find(ts=>ts.id===taskId);
        if(tasks){tasks.isDone = isDone}
        setTasks([...task])*/

    let [filter, setFilter] = useState<filterType>('all')
    let taskForTodolist = task // присвоили новой переменной taskForTodolist, чтобы не использовать для перерисловки Инишиалтаск
    if (filter === 'active') {taskForTodolist = task.filter(t => !t.isDone)}
    if (filter === 'complited') {taskForTodolist = task.filter(t => t.isDone)}

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                task={taskForTodolist}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTasks={addTasks}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}