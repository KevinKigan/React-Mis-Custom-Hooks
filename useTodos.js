import { useEffect, useReducer } from 'react'
import { todoReducer } from '../07-useReducer/todoReducer'

const initialState = []

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        console.log('llamamos al dispatch');
        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Delete Todo',
            payload: id
        }
        dispatch(action)
    }
    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch(action)
    }

    const pendingTodosCount = () =>{
        return todos.filter(todo=>!todo.done).length
    }

    return {
        todos,
        todosCount: todos.length, 
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
