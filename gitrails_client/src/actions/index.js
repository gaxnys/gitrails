import fetch from 'isomorphic-fetch'

export const RAILS_TEST_ACTION = 'RAILS_TEST_ACTION'
export const railsTestAction = () => ({
    type: RAILS_TEST_ACTION
})

export const RAILS_SEND_MESSAGE = 'RAILS_SEND_MESSAGE'
export const railsSendMessage = (message) => ({
    type: RAILS_SEND_MESSAGE,
    message
})

export const TODO_ADDED = 'TODO_ADDED'
export const todoAdded = (json) => ({
    type: TODO_ADDED,
    todo: json
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

export const REQUEST_TODO_ITEMS = 'REQUEST_TODO_ITEMS'
export const requestTodoItems = (id) => ({
    type: REQUEST_TODO_ITEMS,
    id
})

export const RECEIVE_TODO_ITEMS = 'RECEIVE_TODO_ITEMS'
export const receiveTodoItems = (json) => ({
    type: RECEIVE_TODO_ITEMS,
    todoItems: json
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

export const addTodoItem = (todoID, itemName) => (dispatch) => {
    var data = new FormData()
    data.append("name", itemName)
    return fetch('http://localhost:3001/todos/' + todoID + '/items',
                 { method: "POST", body: data})
        .then(
            response => response.json(),
            error => console.log('An error occured.', error)
        )
        .then(json => {
            dispatch(todoAdded(json))
        })
}
