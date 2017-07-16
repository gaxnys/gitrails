import React from 'react'
import PropTypes from 'prop-types'

const Link = (props) => {
    if (props.active) {
        return <span>{props.children}</span>
    }

    return (
        <a
            href=""
            onClick={event => {
                    event.preventDefault()
                    props.onClick()
                }}
        >
            {props.children}
        </a>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link
