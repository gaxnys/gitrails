import fetch from 'isomorphic-fetch'

let nextTodoId = 0

export const ADD_TODO = 'ADD_TODO'
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text
})

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const setVisibilityFilter = filter => ({
    type: SET_VISIBILITY_FILTER,
    filter
})

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const requestTodos = () => ({
    type: REQUEST_TODOS
})

export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const receiveTodos = (json) => ({
    type: RECEIVE_TODOS,
    todos: json
})

export const fetchTodos = () => (dispatch) => {
    dispatch(requestTodos())
    return fetch('http://localhost:3001/todos')
        .then(
            response => response.json(),
            error => console.log('An error occured.', error)
        )
        .then(json => {
            dispatch(receiveTodos(json))
        })
}
