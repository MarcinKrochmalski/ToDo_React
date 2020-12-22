import React, { useContext } from 'react'
import Context from '../contexts/context';

export default function TodoItem({ id, text, completed }) {
    const dispatch = useContext(Context);

    const handleChenge = () => {
        dispatch({ type: 'completed', payload: id })
    }
    return (
        <div className="collection-item row">
            <label >
                <input type="checkbox" checked={completed} onChange={handleChenge} />
                <span>{text}</span>
            </label>
            <button className="btn right" onClick={() => { dispatch({ type: 'delete', payload: id }) }} >Delete</button>
        </div>
    )

}