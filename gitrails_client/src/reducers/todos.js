import { ADD_TODO, TOGGLE_TODO, RECEIVE_TODOS } from '../actions'
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
        default:
            return state
    }
}

export default todos
