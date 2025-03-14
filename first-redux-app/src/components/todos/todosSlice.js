import { createSlice } from "@reduxjs/toolkit";

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
    }
})



export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer