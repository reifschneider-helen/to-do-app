import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../components/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
