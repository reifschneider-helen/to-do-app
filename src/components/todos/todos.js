import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './todosThunks';
import './todos.css';

const Todo = () => {
  const [text, setText] = useState('');
  const { todos, status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text.trim()) {
      setText('');
      dispatch(addTodo(text));
    } else {
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }

    if (e.key === 'Escape') {
      document.activeElement.blur();
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const getBackgroundColor = (todo) => {
    return todo.done ? '#b33968' : '#EA4C89';
  };

  if (status === 'loading') return <p>Loading..</p>;

  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <div className="addTodoContainer">
        <input
          id="inputTodo"
          placeholder="your todo text.."
          type="text"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo}> Add </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li className="todoContainer" key={todo.id}>
            <button
              className="todo"
              placeholder="todo"
              type="text"
              onClick={() => handleToggleTodo(todo.id)}
              style={{ backgroundColor: getBackgroundColor(todo) }}
            >
              {todo.text}
            </button>
            <button
              className="removeButton"
              onClick={() => handleRemoveTodo(todo.id)}
              style={{ backgroundColor: getBackgroundColor(todo) }}
            >
              {' '}
              X{' '}
            </button>{' '}
          </li>
        ))}{' '}
      </ul>{' '}
    </div>
  );
};

export default Todo;
