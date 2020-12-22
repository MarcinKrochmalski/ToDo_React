import React from 'react';
import TodoItem from './TodoItem';
export default function TodoList({ items }) {
    return (
        <div className="collection">
            {items.map(item => (
                <TodoItem {...item} key={item.id} />
            ))}
            {items.length < 1 && <div className="collection-item row">Nothing to do ...</div>}
        </div>
    )
}
