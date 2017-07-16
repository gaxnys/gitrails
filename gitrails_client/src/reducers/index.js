import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export const assignNewData = (array) => {
    return array.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id.toString()] = currentValue
        return accumulator
    }, {})
}

const todoApp = combineReducers({
    todos,
    visibilityFilter
})

export default todoApp
