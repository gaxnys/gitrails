import React from 'react'
import PropTypes from 'prop-types'

const Todo = (props) => (
    <li
        onClick={props.onClick}
        style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
    >
        {props.title}
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
}

export default Todo
