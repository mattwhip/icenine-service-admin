import { connect } from 'react-redux'

import Component from 'app/main/users/cards/devices/component'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => {
    let userDetails = selectors.users.getSelectedUserDetails(state);
    let devices = selectors.users.getDevices(userDetails);
    return {
        devices: devices,
        disabled: !selectors.users.getIsUserSelected(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
