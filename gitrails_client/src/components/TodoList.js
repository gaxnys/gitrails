import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = (props) => (
    <ul>
        {Object.keys(props.todos).map(todoID => (
             <Todo key={todoID} {...props.todos[todoID]} onClick={() => props.onTodoClick(todoID)} />
         ))}
    </ul>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList
