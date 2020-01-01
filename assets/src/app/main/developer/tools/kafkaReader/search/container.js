import { connect } from 'react-redux'

import Component from './component'
import actions from 'actions'
import selectors from 'selectors'


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ConnectedComponent
