import { connect } from 'react-redux'

import ItemListComponent from '../components/ItemList'

const mapStateToProps = (state, ownProps) => {
    return {
        items: (state.todos) ? state.todos[ownProps.todo].items : null
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const ItemList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemListComponent)

export default ItemList
