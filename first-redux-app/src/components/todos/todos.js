import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, fetchTodos } from './todosSlice';
import './todos.css';


const Todo = () => {
    useEffect(() => {
        dispatch(fetchTodos)
    }, [])

    const [text, setText] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text))
            setText("")
        }
        else { setText("") }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo()
        }
        if (e.key === 'Escape') {
            document.activeElement.blur()
        }
    }

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id))
    }

    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id))
    }

    const getBackgroundColor = (todo) => {
        return todo.completed ? '#b33968' : '#EA4C89'
    }

    return (
        <div>
            <div className='addTodoContainer'>
                <input id='inputTodo' placeholder='your todo text..' type='text' value={text} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <button onClick={handleAddTodo}> Add </button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li className='todoContainer'
                        key={todo.id}
                    >
                        <button className='todo' placeholder='todo' type='text' onClick={() => handleToggleTodo(todo.id)}
                            style={{ backgroundColor: getBackgroundColor(todo) }}
                        >{todo.text}</button>
                        <button className='removeButton' onClick={() => handleRemoveTodo(todo.id)}
                            style={{ backgroundColor: getBackgroundColor(todo) }}
                        > X </button>{" "}
                    </li>
                )
                )}{" "}
            </ul>{" "}
        </div>
    )
}

export default Todo;