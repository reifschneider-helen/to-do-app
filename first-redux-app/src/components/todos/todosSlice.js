import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("http://localhost:3001/api/todos");
    const data = await response.json()
    return data
})

const sortTodos = (todoArray) => {
    todoArray.sort((todo1, todo2) => {
        if (todo1.completed === todo2.completed) return 0
        return todo1.completed ? 1 : -1
    })
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action) {
            const text = action.payload
            state.push({ id: Date.now(), text, completed: false })
            sortTodos(state);
        },
        toggleTodo(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
            sortTodos(state);
        },
        removeTodo(state, action) {
            return state.filter((todo) => todo.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})



export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer