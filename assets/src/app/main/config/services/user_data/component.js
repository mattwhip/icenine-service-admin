import React from 'react'
import { Tooltip, Form, Input, FormGroup, Label } from 'reactstrap';

import requestStates from 'requestStates'
import styles from 'app/main/config/services/user_data/styles.module.css'
import configStyles from 'app/main/config/styles.module.css'
import { component as DirtyBox } from 'app/dirtyBox'
import { createConfigStatusText } from 'app/main/config/statusText'
import { component as EditPanel } from 'app/editPanel'

const tooltipSyle = {
    backgroundColor: "lightGray",
    color: "black",
}

class UserDataConfig extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            initialCoinsTooltipOpen: false,
            initialSkillLevelTooltipOpen: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
        this.handleInitialCoinsChanged = this.handleInitialCoinsChanged.bind(this);
        this.handleInitialRatingChanged = this.handleInitialRatingChanged.bind(this);
        this.handleInitialRatingDeviationChanged = this.handleInitialRatingDeviationChanged.bind(this);
        this.handleInitialRatingVolatilityChanged = this.handleInitialRatingVolatilityChanged.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleInitialCoinsTooltip = this.toggleInitialCoinsTooltip.bind(this);
        this.toggleInitialRatingTooltip = this.toggleInitialRatingTooltip.bind(this);
        this.toggleInitialRatingDeviationTooltip = this.toggleInitialRatingDeviationTooltip.bind(this);
        this.toggleInitialRatingVolatilityTooltip = this.toggleInitialRatingVolatilityTooltip.bind(this);
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

    handleInitialCoinsChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.initialCoins).valueOf();
        this.props.uiSetConfig({
            initialCoins: event.target.value,
            initialCoinsDirtyFlag: dirty,
        });
    }

    handleInitialRatingChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.initialRating).valueOf();
        this.props.uiSetConfig({
            initialRating: event.target.value,
            initialRatingDirtyFlag: dirty,
        });
    }

    handleInitialRatingDeviationChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.initialRatingDeviation).valueOf();
        this.props.uiSetConfig({
            initialRatingDeviation: event.target.value,
            initialRatingDeviationDirtyFlag: dirty,
        });
    }

    handleInitialRatingVolatilityChanged(event) {
        let dirty = new String(event.target.value).valueOf() != new String(this.props.config.initialRatingVolatility).valueOf();
        this.props.uiSetConfig({
            initialRatingVolatility: event.target.value,
            initialRatingVolatilityDirtyFlag: dirty,
        });
    }

    handleSave() {
        let newInitialCoins = this.props.uiConfig.initialCoinsDirtyFlag ? this.props.uiConfig.initialCoins : this.props.config.initialCoins;
        let newInitialRating = this.props.uiConfig.initialRatingDirtyFlag ? this.props.uiConfig.initialRating : this.props.config.initialRating;
        let newInitialRatingDeviation = this.props.uiConfig.initialRatingDeviationDirtyFlag ? this.props.uiConfig.initialRatingDeviation : this.props.config.initialRatingDeviation;
        let newInitialRatingVolatility = this.props.uiConfig.initialRatingVolatilityDirtyFlag ? this.props.uiConfig.initialRatingVolatility : this.props.config.initialRatingVolatility;
        this.props.setConfig({
            initialCoins: newInitialCoins,
            initialRating: newInitialRating,
            initialRatingDeviation: newInitialRatingDeviation,
            initialRatingVolatility: newInitialRatingVolatility,
        })
    }

    handleCancel() {
        this.props.uiSetConfig({
            initialCoinsDirtyFlag: false,
            initialRatingDirtyFlag: false,
            initialRatingDeviationDirtyFlag: false,
            initialRatingVolatilityDirtyFlag: false,
            intitialCoins: this.props.config.intitialCoins,
            intitialRating: this.props.config.intitialRating,
            intitialRatingDeviation: this.props.config.intitialRatingDeviation,
            intitialRatingVolatility: this.props.config.intitialRatingVolatility,
            comments: "",
        });
    }

    toggleInitialCoinsTooltip() {
        this.setState({
            initialCoinsTooltipOpen: !this.state.initialCoinsTooltipOpen
        });
    }

    toggleInitialRatingTooltip() {
        this.setState({
            initialRatingTooltipOpen: !this.state.initialRatingTooltipOpen
        });
    }

    toggleInitialRatingDeviationTooltip() {
        this.setState({
            initialRatingDeviationTooltipOpen: !this.state.initialRatingDeviationTooltipOpen
        });
    }

    toggleInitialRatingVolatilityTooltip() {
        this.setState({
            initialRatingVolatilityTooltipOpen: !this.state.initialRatingVolatilityTooltipOpen
        });
    }

    render () {
        const { config, uiConfig, anyDirtyFlagSet } = this.props;
        let displayInitialCoins = config.initialCoins || '';
        if (uiConfig.initialCoinsDirtyFlag) {
            displayInitialCoins = uiConfig.initialCoins;
        }
        // parseFloat(config.initialRating).toFixed(2)
        let displayInitialRating = config ? parseFloat(config.initialRating) : '';
        if (uiConfig.initialRatingDirtyFlag) {
            displayInitialRating = uiConfig.initialRating;
        }
        let displayInitialRatingDeviation = config ? parseFloat(config.initialRatingDeviation) : '';
        if (uiConfig.initialRatingDeviationDirtyFlag) {
            displayInitialRatingDeviation = uiConfig.initialRatingDeviation;
        }
        let displayInitialRatingVolatility = config ? parseFloat(config.initialRatingVolatility) : '';
        if (uiConfig.initialRatingVolatilityDirtyFlag) {
            displayInitialRatingVolatility = uiConfig.initialRatingVolatility;
        }
        const statusText = createConfigStatusText(config.state, config.stateTime);
        const saveDisabled = config.state == requestStates.SETTING;
        return (
            <EditPanel
                id="userData"
                title={`User Data Configuration${anyDirtyFlagSet ? ' *' : ''}`}
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
                            <Label for="initialCoins" id="initialCoinsLabel">
                                {`Initial Coins${uiConfig.initialCoinsDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.initialCoinsDirtyFlag}>
                                <Input
                                    type        = "number"
                                    min         = "1"
                                    bsSize      = "sm"
                                    name        = "initialCoins"
                                    id          = "initialCoins"
                                    className   = {styles.configTextField}
                                    value       = {displayInitialCoins}
                                    onChange    = {this.handleInitialCoinsChanged} />
                            </DirtyBox>
                        </FormGroup>
                        <FormGroup>
                            <Label for="initialRating" id="initialRatingLabel">
                                {`Initial Rating${uiConfig.initialRatingDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.initialRatingDirtyFlag}>
                                <Input
                                    type        = "number"
                                    step        = "0.01"
                                    min         = "0"
                                    bsSize      = "sm"
                                    name        = "initialRating"
                                    id          = "initialRating"
                                    className   = {styles.configTextField}
                                    value       = {displayInitialRating}
                                    onChange    = {this.handleInitialRatingChanged} />
                            </DirtyBox>
                        </FormGroup>
                        <FormGroup>
                            <Label for="initialRatingDeviation" id="initialRatingDeviationLabel">
                                {`Initial Rating Deviation${uiConfig.initialRatingDeviationDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.initialRatingDeviationDirtyFlag}>
                                <Input
                                    type        = "number"
                                    step        = "0.01"
                                    min         = "0"
                                    bsSize      = "sm"
                                    name        = "initialRatingDeviation"
                                    id          = "initialRatingDeviation"
                                    className   = {styles.configTextField}
                                    value       = {displayInitialRatingDeviation}
                                    onChange    = {this.handleInitialRatingDeviationChanged} />
                            </DirtyBox>
                        </FormGroup>
                        <FormGroup>
                            <Label for="initialRatingVolatility" id="initialRatingVolatilityLabel">
                                {`Initial Rating Volatility${uiConfig.initialRatingVolatilityDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.initialRatingVolatilityDirtyFlag}>
                                <Input
                                    type        = "number"
                                    step        = "0.01"
                                    min         = "0"
                                    bsSize      = "sm"
                                    name        = "initialRatingVolatility"
                                    id          = "initialRatingVolatility"
                                    className   = {styles.configTextField}
                                    value       = {displayInitialRatingVolatility}
                                    onChange    = {this.handleInitialRatingVolatilityChanged} />
                            </DirtyBox>
                        </FormGroup>
                    </Form>
                    <div>
                        <Tooltip placement="left" isOpen={this.state.initialCoinsTooltipOpen} target="initialCoinsLabel" toggle={this.toggleInitialCoinsTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The number of coins given to a new user
                        </Tooltip>
                        <Tooltip placement="left" isOpen={this.state.initialRatingTooltipOpen} target="initialRatingLabel" toggle={this.toggleInitialRatingTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The Glicko2 rating value given to a new user
                        </Tooltip>
                        <Tooltip placement="left" isOpen={this.state.initialRatingDeviationTooltipOpen} target="initialRatingDeviationLabel" toggle={this.toggleInitialRatingDeviationTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The Glicko2 rating deviation value given to a new user
                        </Tooltip>
                        <Tooltip placement="left" isOpen={this.state.initialRatingVolatilityTooltipOpen} target="initialRatingVolatilityLabel" toggle={this.toggleInitialRatingVolatilityTooltip} delay={{show: 750, hide: 250}} style={tooltipSyle} hideArrow={true}>
                            The Glicko2 rating volatility value given to a new user
                        </Tooltip>
                    </div>
                </div>
            </EditPanel>
        )
    }
}

export default UserDataConfig
