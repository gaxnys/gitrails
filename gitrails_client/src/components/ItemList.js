import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'

const ItemList = (props) => {
    return (<ul>{props.items.map((item) => <Item name={item.name} />)}</ul>)
}

ItemList.propTypes = {

}

export default ItemList
