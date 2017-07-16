import { connect } from 'react-redux'
import { ActionCable } from 'react-actioncable-provider'

const ActionCableComponent = (props) => {
    return <ActionCable ref='roomChannel'
                        channel={{channel: 'RoomChannel', room: '3'}}
                        onReceived={props.onReceived} />

}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReceived: (message) => console.log(message)
    }
}

const ActionCable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionCableComponent)

export default ActionCable
