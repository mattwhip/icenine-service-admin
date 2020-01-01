import React from 'react'
import { Tooltip, Label } from 'reactstrap';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

import requestStates from 'requestStates'
import styles from 'app/main/config/services/bot/styles.module.css'
import configStyles from 'app/main/config/styles.module.css'
import docs from 'app/main/config/services/bot/docs'
import { createConfigStatusText } from 'app/main/config/statusText'
import { component as DirtyBox } from 'app/dirtyBox'
import { component as EditPanel } from 'app/editPanel'

const tooltipStyle = {
    backgroundColor: "lightGray",
    color: "black",
}

class BotConfig extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blueprintsJSONTooltipOpen: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
        this.handleBlueprintsJSONChanged = this.handleBlueprintsJSONChanged.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleBlueprintsJSONTooltip = this.toggleBlueprintsJSONTooltip.bind(this);
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

    handleBlueprintsJSONChanged(event) {
        let dirty = new String(event.json).valueOf() != new String(this.props.config.blueprintsJSON).valueOf();
        this.props.uiSetConfig({
            blueprintsJSON: event.json,
            blueprintsJSONDirtyFlag: dirty,
        });
    }

    handleSave() {
        let newBlueprintsJSON = this.props.uiConfig.blueprintsJSONDirtyFlag ? this.props.uiConfig.blueprintsJSON : this.props.config.blueprintsJSON;
        this.props.setConfig({
            blueprintsJSON: newBlueprintsJSON,
        })
    }

    handleCancel() {
        this.props.uiSetConfig({
            blueprintsJSONDirtyFlag: false,
            blueprintsJSON: this.props.config.blueprintsJSON,
            comments: "",
        });
    }

    toggleBlueprintsJSONTooltip() {
        this.setState({
            blueprintsJSONTooltipOpen: !this.state.blueprintsJSONTooltipOpen
        })
    }

    render () {
        const { config, uiConfig, anyDirtyFlagSet } = this.props;
        let displayBlueprintsJSON = config.blueprintsJSON || '{}';
        if (uiConfig.blueprintsJSONDirtyFlag) {
            displayBlueprintsJSON = uiConfig.blueprintsJSON;
        }
        let blueprintsJSONPlaceholder = {};
        try {
            blueprintsJSONPlaceholder = JSON.parse(displayBlueprintsJSON);
        } catch(e) {
            blueprintsJSONPlaceholder = JSON.parse(config.blueprintsJSON);
        }
        const statusText = createConfigStatusText(config.state, config.stateTime);
        const saveDisabled = config.state == requestStates.SETTING;
        return (
            <EditPanel
                id="bot"
                title={`Bot Configuration${anyDirtyFlagSet ? ' *' : ''}`}
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
                    <div className="row no-gutters">
                        <div className="col-sm-auto">
                            <Label for="blueprintsJSON" id="blueprintsJSONLabel">
                                {`Blueprints${uiConfig.blueprintsJSONDirtyFlag ? ' *' : ''}`}
                            </Label>
                            <DirtyBox isDirty={uiConfig.blueprintsJSONDirtyFlag} style={{paddingBottom: "6px"}}>
                                <JSONInput
                                    id          = 'blueprintsJSON'
                                    placeholder = {blueprintsJSONPlaceholder}
                                    locale      = {locale}
                                    height      = '600px'
                                    width       = '400px'
                                    onChange    = {this.handleBlueprintsJSONChanged} />
                            </DirtyBox>
                        </div>
                        <div className={`col-sm-auto ${styles.components}`}>
                            <div className={styles.componentHeader}>Browse Components</div>
                            {docs.createComponentDocumentation()}
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <div>
                        <Tooltip placement="left" isOpen={this.state.blueprintsJSONTooltipOpen} target="blueprintsJSONLabel" toggle={this.toggleBlueprintsJSONTooltip} delay={{show: 750, hide: 250}} style={tooltipStyle} hideArrow={true}>
                            JSON configuration for bot blueprints, where each blueprint consists of a collection of configured resuseable components.
                        </Tooltip>
                    </div>
                </div>
            </EditPanel>
        )
    }   
}
export default BotConfig
