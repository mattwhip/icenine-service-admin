import React from 'react'
import { Tooltip, Form, Input, FormGroup, Label } from 'reactstrap';

import requestStates from 'requestStates'
import styles from 'app/main/config/services/user_accounts/styles.module.css'
import configStyles from 'app/main/config/styles.module.css'
import { component as DirtyBox } from 'app/dirtyBox'
import { component as EditPanel } from 'app/editPanel'
import { createConfigStatusText } from 'app/main/config/statusText'

const tooltipSyle = {
    backgroundColor: "lightGray",
    color: "black",
}

class UserAccountsConfig extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            jwtExpirationSecondsTooltipOpen: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
        this.handleJwtExpirationSecondsChanged = this.handleJwtExpirationSecondsChanged.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleJwtExpirationSecondsTooltip = this.toggleJwtExpirationSecondsTooltip.bind(this);
    }

    componentDidMount() {
        if (this.props.config.state === requestStates.INITIAL) {
            this.props.getConfig()
        }
    }

    handleRefresh(event) {
        this.props.getConfig()
    }

    handleCommentsChanged(event) {
        this.props.uiSetConfig({
            comments: event.target.value,
        })
    }

    handleJwtExpirationSecondsChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.jwtExpirationSeconds).valueOf();
        this.props.uiSetConfig({
            jwtExpirationSeconds: event.target.value,
            jwtExpirationSecondsDirtyFlag: dirty,
        });
    }

    handleSave() {
        let newJwtExpirationSeconds = this.props.uiConfig.jwtExpirationSecondsDirtyFlag ? this.props.uiConfig.jwtExpirationSeconds : this.props.config.jwtExpirationSeconds;
        this.props.setConfig({
            jwtExpirationSeconds: newJwtExpirationSeconds,
        })
    }

    handleCancel() {
        this.props.uiSetConfig({
            jwtExpirationSecondsDirtyFlag: false,
            jwtExpirationSeconds: this.props.config.jwtExpirationSeconds,
            comments: "",
        });
    }

    toggleJwtExpirationSecondsTooltip() {
        this.setState({
            jwtExpirationSecondsTooltipOpen: !this.state.jwtExpirationSecondsTooltipOpen
        });
    }

    render () {
        const { config, uiConfig, anyDirtyFlagSet } = this.props;
        let displayJwtExpirationSeconds = config.jwtExpirationSeconds || '';
        if (uiConfig.jwtExpirationSecondsDirtyFlag) {
            displayJwtExpirationSeconds = uiConfig.jwtExpirationSeconds;
        }
        const statusText = createConfigStatusText(config.state, config.stateTime);
        const saveDisabled = config.state == requestStates.SETTING;
        return (
            <EditPanel
                id="userAccounts"
                title={`User Accounts Configuration${anyDirtyFlagSet ? ' *' : ''}`}
                onRefresh={this.handleRefresh}
                onCancel={this.handleCancel}
                onSave={this.handleSave}
                onCommentsChanged={this.handleCommentsChanged}
                saveDisabled={saveDisabled}
                anyDirtyFlagSet={anyDirtyFlagSet}
                statusText={statusText}
                errorText={uiConfig.errorText}
                comments={uiConfig.comments}>
                <div className={`${configStyles.serviceConfigEditPanelContent}`}>
                    <Form onSubmit={(e)=>{e.preventDefault();}}>
                        <FormGroup>
                            <Label for="jwtExpirationSeconds" id="jwtExpirationSecondsLabel">
                                {`JWT Expiration Seconds${uiConfig.jwtExpirationSecondsDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.jwtExpirationSecondsDirtyFlag}>
                                <Input
                                    type        = "number"
                                    bsSize      = "sm"
                                    name        = "jwtExpirationSeconds"
                                    id          = "jwtExpirationSeconds"
                                    className   = {styles.configTextField}
                                    value       = {displayJwtExpirationSeconds}
                                    onChange    = {this.handleJwtExpirationSecondsChanged} />
                            </DirtyBox>
                        </FormGroup>
                    </Form>
                    <div>
                        <Tooltip placement="left" isOpen={this.state.jwtExpirationSecondsTooltipOpen} target="jwtExpirationSecondsLabel" toggle={this.toggleJwtExpirationSecondsTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The amount of time from when a JWT is issued until it is considered expired
                        </Tooltip>
                    </div>
                </div>
            </EditPanel>
        )
    }
}

export default UserAccountsConfig
