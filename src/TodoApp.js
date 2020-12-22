import React, { useEffect, useReducer, useState } from 'react';
import Context from './contexts/context';
import TodoList from './components/TodoList';
import * as M from 'materialize-css';

function appReducer(state, action) {

    switch (action.type) {
        case 'start': {
            return action.payload
        }
        case 'add': {
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.text,
                    completed: false

                }
            ]
        }

        case 'completed': {
            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed
                    }

                } else
                    return item;
            })
        }
        case 'delete': {
            return state.filter(item => item.id !== action.payload)
        }
        default:
            return state;
    }

}

export default function TodoApp() {

    const [todoText, setTodoText] = useState('');
    const [state, dispatch] = useReducer(appReducer, []);

    useEffect(() => {
        const rawData = localStorage.getItem('data');
        dispatch({ type: 'start', payload: JSON.parse(rawData) })
        M.AutoInit();
    }, []);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(state));
    }, [state]);

    return (
        <Context.Provider value={dispatch} >
            <div className="container">
                <h4>Todo</h4>
                <div className="row" >
                    <input type="text" value={todoText} onChange={event => setTodoText(event.target.value)} placeholder="New task" />
                    <button className="btn right" onClick={() => {
                        if (todoText !== '') dispatch({ type: 'add', text: todoText })
                        setTodoText('');
                    }}>Add</button>
                </div>
                <div className="row" >
                    <TodoList items={state} />
                </div>
            </div>
        </Context.Provider>
    )
}
