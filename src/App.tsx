import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export const App = () => {

    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: v1(), title: 'New what to learn', filter: 'all'},
        {id: v1(), title: 'OLD what to learn', filter: 'all'}
    ])
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'Html & CSS', isDone: false},
        {id: v1(), title: 'JAVA', isDone: true},
        {id: v1(), title: 'PYTON', isDone: false},
        {id: v1(), title: 'PYTON', isDone: false},
    ])

    function removeTasks(id: string) {
        setTasks(tasks.filter(f => f.id !== id))
    }


    function addTasks(title: string) {
        setTasks([{id: v1(), title, isDone: true}, ...tasks])

    }

    function changeStatus(id: string, value: boolean) {
        setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))
    }

    // let [filter, setFilter] = useState<FilterType>('all')

    /* */
    function changeFilter(todolistId: string, value: FilterType) {
       setTodolist(todolist.map(m => m.id === todolistId ? {...m, filter: value} : m))
            }

    return (
        <div className='App'>
            {
                todolist.map(m => {
                    //debugger
                    let tasksForTodolist = tasks
                    if (m.filter === 'active') {
                        tasksForTodolist = tasks.filter(f => !f.isDone)
                    }
                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks.filter(f => f.isDone)
                    }
                    return (
                        <Todolist
                            key={m.id} //обязательно, для внутрннего функционала
                            todolistId={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            changeFilter={changeFilter}
                            removeTasks={removeTasks}
                            addTasks={addTasks}
                            changeStatus={changeStatus}
                            filter={m.filter}
                        />)
                })
            }
        </div>
    );
};

