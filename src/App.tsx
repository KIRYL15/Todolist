import React from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from "uuid";

export function App() {
    const tasks1 = [
        {id: v1(), },

    ]

    return (
        <div className="App">
            <Todolist title='What to learn'/>
            <Todolist title='НОВЫЙ'/>
            <Todolist title='What to learn'/>
        </div>
    );
}