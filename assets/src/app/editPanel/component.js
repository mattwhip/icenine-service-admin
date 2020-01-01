import React from 'react'
import { Tooltip, Label } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import { Icon } from "react-icons-kit";
import { refresh } from 'react-icons-kit/fa/refresh';

import buttonStyles from 'app/buttons/styles.module.css'
import styles from './styles.module.css'
import styling from 'styling/styles.module.css'
import { component as SaveBar } from 'app/saveBar'

const tooltipStyle = {
    backgroundColor: "lightGray",
    color: "black",
}

class EditPanel extends React.Component {
    constructor (props) {

        super(props);
        this.state = {
            refreshTooltipOpen: false,
        };
        this.toggleRefreshTooltip = this.toggleRefreshTooltip.bind(this);
    }

    toggleRefreshTooltip() {
        this.setState({
            refreshTooltipOpen: !this.state.refreshTooltipOpen
        });
    }

    render() {
        const { id, title, onRefresh, onCancel, onSave, onCommentsChanged,
                saveDisabled, anyDirtyFlagSet, statusText, errorText, comments,
                children } = this.props;
        return (
            <div className={styles.editPanel}>
                <div className={`${styling.floatCenterRow} ${styles.editPanelTitleRow}`}>
                    <div className={`container-fluid ${styles.editPanelTitle}`}>
                        <div className={`row no-gutters`}>
                            <div className={`col-sm-auto`}>
                                {title}
                            </div>
                            <div className={`col-sm-auto`} onClick={onRefresh} id={`${id}RefreshIcon`}>
                                <Icon className={`${styles.editPanelRefreshIcon} ${buttonStyles.buttonIcon}`} icon={refresh} size={20}/>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
                <ScrollArea
                    speed={0.8}
                    className={styles.editPanelContent}
                    vertical={true}
                    horizontal={false}>
                    <div>
                        {children}
                    </div>
                </ScrollArea>
                <div>
                    <SaveBar
                        id={`${id}SaveBar`}
                        statusText={statusText}
                        errorText={errorText}
                        comments={comments}
                        onCommentsChange={onCommentsChanged}
                        onSave={onSave}
                        onCancel={onCancel}
                        saveDisabled={saveDisabled}
                        cancelDisabled={false}
                        hideInputs={!anyDirtyFlagSet}/>
                </div>
                <Tooltip placement="right" isOpen={this.state.refreshTooltipOpen} target={`${id}RefreshIcon`} toggle={this.toggleRefreshTooltip} delay={{show: 750, hide: 250}} style={tooltipStyle} hideArrow={true}>
                    Refresh values on this page. Does NOT force services to reload from database.
                </Tooltip>
            </div>
        )
    }
}

export default EditPanel
