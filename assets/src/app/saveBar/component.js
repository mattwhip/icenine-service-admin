import React from 'react'
import { Button, Form, Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Icon } from "react-icons-kit";
import { alertCircled } from 'react-icons-kit/ionicons/alertCircled'

import buttonStyles from 'app/buttons/styles.module.css'
import styles from 'app/saveBar/styles.module.css'

class SaveBar extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorPopoverOpen: false,
        }
        this.toggleErrorPopover = this.toggleErrorPopover.bind(this);
        this.soloToggleErrorPopover = this.soloToggleErrorPopover.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleErrorPopover(event) {
        event.preventDefault();
        this.setState({
            errorPopoverOpen: !this.state.errorPopoverOpen
        });
    }

    soloToggleErrorPopover() {
        this.setState({
            errorPopoverOpen: !this.state.errorPopoverOpen
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSave();
    }

    render () {
        const { id, statusText, errorText, comments, onCommentsChange, onSave, onCancel, saveDisabled, cancelDisabled, hideInputs } = this.props;
        const dynamicHideClass = hideInputs ? styles.hidden : '';
        let errorEnabled = errorText != undefined && errorText.length > 0;
        const dynamicHideErrorClass = !errorEnabled ? styles.hiddenIcon : '';
        return (
            <div className={`container-fluid ${styles.bar}`}>
                <div className="row no-gutters">
                    <div className="col-sm-auto" onClick={this.toggleErrorPopover}>
                        <div className={dynamicHideErrorClass}>
                            <Icon id={`${id}ErrorIcon`} className={`${buttonStyles.buttonIcon} ${buttonStyles.errorIcon} ${styles.errorIcon}`} icon={alertCircled} size={24}/>
                        </div>
                        <Popover placement="bottom-start" isOpen={this.state.errorPopoverOpen} target={`${id}ErrorIcon`} toggle={this.soloToggleErrorPopover}>
                            <PopoverHeader>Error Details</PopoverHeader>
                            <PopoverBody>
                                <div>
                                    <span>{errorText}</span>
                                </div>
                            </PopoverBody>
                        </Popover>
                    </div>
                    <div className={`col-sm-auto ${styles.statusText}`}>
                        {statusText}
                    </div>
                    <div className={`col`}>
                        
                    </div>
                    <div className={`row no-gutters ${dynamicHideClass}`}>
                        <div className={`col-sm-auto ${styles.comments}`}>
                            <Form onSubmit={this.handleSubmit}>
                                <Input type="text" bsSize="sm" name="comments" id="comments" placeholder="Comments..." onChange={onCommentsChange} value={comments} />
                            </Form>
                        </div>
                        <div className={`col-sm-auto ${styles.buttons}`}>
                            <Button size="sm" color="secondary" disabled={cancelDisabled} onClick={onCancel}>Cancel</Button>
                            {' '}
                            <Button size="sm" color="primary" disabled={saveDisabled} onClick={onSave}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaveBar
