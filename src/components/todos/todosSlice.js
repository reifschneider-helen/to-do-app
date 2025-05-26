import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "./todosThunks";

const sortTodos = (todoArray) => {
  todoArray.sort((todo1, todo2) => {
    if (todo1.done === todo2.done) return 0;
    return todo1.done ? 1 : -1;
  });
};

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
        sortTodos(state.todos);
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
        sortTodos(state.todos);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.done = !todo.done;
          }
        });
        sortTodos(state.todos);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
