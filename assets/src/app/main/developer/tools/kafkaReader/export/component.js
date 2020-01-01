import React from 'react'
import { Button } from 'reactstrap';

import styles from './styles.module.css'


class ExportPanel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { isTopicSelected, topicsExist } = this.props;
        const exportPanel = this;
        return (
            <div className={`container ${styles.exportContainer}`}>
                <div className="row no-gutters">
                    <div className={`col-sm-auto ${styles.buttonContainer}`}>
                        <Button disabled={!isTopicSelected} size="sm" color="secondary"
                            onClick={() => {exportPanel.props.exportSelectedTopic()}}>
                            Selected Topic
                        </Button>
                    </div>
                    <div className={`col-sm-auto ${styles.buttonContainer}`}>
                        <Button disabled={!topicsExist} size="sm" color="secondary"
                            onClick={() => {exportPanel.props.exportAllTopics()}}>
                            All Topics
                        </Button>
                    </div>
                    <div className={`col`}>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportPanel
