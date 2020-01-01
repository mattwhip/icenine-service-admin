import React from 'react'
import { Tooltip, Form, Input, FormGroup, Label } from 'reactstrap';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

import requestStates from 'requestStates'
import styles from 'app/main/config/services/daily_bonus/styles.module.css'
import configStyles from 'app/main/config/styles.module.css'
import { component as DirtyBox } from 'app/dirtyBox'
import { component as EditPanel } from 'app/editPanel'
import { createConfigStatusText } from 'app/main/config/statusText'


const tooltipSyle = {
    backgroundColor: "lightGray",
    color: "black",
}

class DailyBonusConfig extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            streakBreakSecondsTooltipOpen: false,
            resetSecondsTooltipOpen: false,
            wheelsJSONTooltipOpen: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
        this.handleResetSecondsChanged = this.handleResetSecondsChanged.bind(this);
        this.handleStreakBreakSecondsChanged = this.handleStreakBreakSecondsChanged.bind(this);
        this.handleWheelsJSONChanged = this.handleWheelsJSONChanged.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleStreakBreakSecondsTooltip = this.toggleStreakBreakSecondsTooltip.bind(this);
        this.toggleResetSecondsTooltip = this.toggleResetSecondsTooltip.bind(this);
        this.toggleWheelsJSONTooltip = this.toggleWheelsJSONTooltip.bind(this);
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

    handleResetSecondsChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.resetSeconds).valueOf();
        this.props.uiSetConfig({
            resetSeconds: event.target.value,
            resetSecondsDirtyFlag: dirty,
        });
    }

    handleStreakBreakSecondsChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.streakBreakSeconds).valueOf();
        this.props.uiSetConfig({
            streakBreakSeconds: event.target.value,
            streakBreakSecondsDirtyFlag: dirty,
        });
    }

    handleWheelsJSONChanged(event) {
        let dirty = new String(event.json).valueOf() != new String(this.props.config.wheelsJSON).valueOf();
        this.props.uiSetConfig({
            wheelsJSON: event.json,
            wheelsJSONDirtyFlag: dirty,
        });
    }

    handleSave() {
        let newResetSeconds = this.props.uiConfig.resetSecondsDirtyFlag ? this.props.uiConfig.resetSeconds : this.props.config.resetSeconds;
        let newStreakBreakSeconds = this.props.uiConfig.streakBreakSecondsDirtyFlag ? this.props.uiConfig.streakBreakSeconds : this.props.config.streakBreakSeconds;
        let newWheelsJSON = this.props.uiConfig.wheelsJSONDirtyFlag ? this.props.uiConfig.wheelsJSON : this.props.config.wheelsJSON;
        this.props.setConfig({
            resetSeconds: newResetSeconds,
            streakBreakSeconds: newStreakBreakSeconds,
            wheelsJSON: newWheelsJSON,
        })
    }

    handleCancel() {
        this.props.uiSetConfig({
            resetSecondsDirtyFlag: false,
            resetSeconds: this.props.config.resetSeconds,
            streakBreakSecondsDirtyFlag: false,
            streakBreakSeconds: this.props.config.streakBreakSeconds,
            wheelsJSONDirtyFlag: false,
            wheelsJSON: this.props.config.wheelsJSON,
            comments: "",
        });
    }

    toggleStreakBreakSecondsTooltip() {
        this.setState({
            streakBreakSecondsTooltipOpen: !this.state.streakBreakSecondsTooltipOpen
        });
    }

    toggleResetSecondsTooltip() {
        this.setState({
            resetSecondsTooltipOpen: !this.state.resetSecondsTooltipOpen
        });
    }

    toggleWheelsJSONTooltip() {
        this.setState({
            wheelsJSONTooltipOpen: !this.state.wheelsJSONTooltipOpen
        })
    }

    render () {
        const { config, uiConfig, anyDirtyFlagSet } = this.props;
        let displayResetSeconds = config.resetSeconds || '';
        if (uiConfig.resetSecondsDirtyFlag) {
            displayResetSeconds = uiConfig.resetSeconds;
        }
        let displayStreakBreakSeconds = config.streakBreakSeconds || '';
        if (uiConfig.streakBreakSecondsDirtyFlag) {
            displayStreakBreakSeconds = uiConfig.streakBreakSeconds;
        }
        let displayWheelsJSON = config.wheelsJSON || '{}';
        if (uiConfig.wheelsJSONDirtyFlag) {
            displayWheelsJSON = uiConfig.wheelsJSON;
        }
        let wheelsJSONPlaceholder = {};
        try {
            wheelsJSONPlaceholder = JSON.parse(displayWheelsJSON);
        } catch(e) {
            wheelsJSONPlaceholder = JSON.parse(config.wheelsJSON);
        }
        const statusText = createConfigStatusText(config.state, config.stateTime);
        const saveDisabled = config.state == requestStates.SETTING;
        return (
            <EditPanel
                id="dailyBonus"
                title={`Daily Bonus Configuration${anyDirtyFlagSet ? ' *' : ''}`}
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
                    <Form>
                        <FormGroup>
                            <Label for="resetSeconds" id="resetSecondsLabel">
                                {`Reset seconds${uiConfig.resetSecondsDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.resetSecondsDirtyFlag}>
                                <Input
                                    type        = "number"
                                    bsSize      = "sm"
                                    name        = "resetSeconds"
                                    id          = "resetSeconds"
                                    className   = {styles.configTextField}
                                    value       = {displayResetSeconds}
                                    onChange    = {this.handleResetSecondsChanged} />
                            </DirtyBox>
                        </FormGroup>
                        <FormGroup>
                            <Label for="streakBreakSeconds" id="streakBreakSecondsLabel">
                                {`Streak break seconds${uiConfig.streakBreakSecondsDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.streakBreakSecondsDirtyFlag}>
                                <Input
                                    type        = "number"
                                    bsSize      = "sm"
                                    name        = "streakBreakSeconds"
                                    id          = "streakBreakSeconds"
                                    className   = {styles.configTextField}
                                    value       = {displayStreakBreakSeconds}
                                    onChange    = {this.handleStreakBreakSecondsChanged} />
                            </DirtyBox>
                        </FormGroup>
                        <FormGroup>
                            <Label for="wheelsJSON" id="wheelsJSONLabel">
                                {`Wheels${uiConfig.wheelsJSONDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.wheelsJSONDirtyFlag} style={{paddingBottom: "6px"}}>
                                <JSONInput
                                    id          = 'wheelsJSON'
                                    placeholder = {wheelsJSONPlaceholder}
                                    locale      = {locale}
                                    height      = '400px'
                                    width       = '300px'
                                    onChange    = {this.handleWheelsJSONChanged} />
                            </DirtyBox>
                        </FormGroup>
                    </Form>
                    <div>
                        <Tooltip placement="left" isOpen={this.state.resetSecondsTooltipOpen} target="resetSecondsLabel" toggle={this.toggleResetSecondsTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The amount of time from a user's last played daily bonus before it next becomes available
                        </Tooltip>
                        <Tooltip placement="left" isOpen={this.state.streakBreakSecondsTooltipOpen} target="streakBreakSecondsLabel" toggle={this.toggleStreakBreakSecondsTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The amount of time from a user's last played daily bonus before their streak is considered broken
                        </Tooltip>
                        <Tooltip placement="left" isOpen={this.state.wheelsJSONTooltipOpen} target="wheelsJSONLabel" toggle={this.toggleWheelsJSONTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            JSON configuration for daily bonus wheels, where each wheel is associated with a user streak value
                        </Tooltip>
                    </div>
                </div>
            </EditPanel>
        )
    }
}

export default DailyBonusConfig
