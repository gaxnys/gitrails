import { TODO_ADDED, TOGGLE_TODO, RECEIVE_TODOS } from '../actions'
import { assignNewData } from './index'

const todos = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_TODO:
            return state.map(todo =>
                (todo.id === action.id)
                                 ? {...todo, completed: !todo.completed}
                                 : todo
            )
        case RECEIVE_TODOS:
            return Object.assign({}, state, assignNewData(action.todos))
        case TODO_ADDED:
            return Object.assign({}, state, assignNewData([action.todo]))
        default:
            return state
    }
}

export default todos
