import Component from 'app/login/component'
import actions from 'actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    isAuthorized: state.auth.isAuthorized,
    isAuthorizing: state.ui.login.isAuthorizing
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (user, pass) => {
        dispatch(actions.login.submitLoginRequest(user, pass))
    }
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
