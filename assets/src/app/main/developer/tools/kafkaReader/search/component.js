import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
import Collapsible from 'react-collapsible';
import { Icon } from "react-icons-kit";
import { refresh } from 'react-icons-kit/fa/refresh';

import requestStates from 'requestStates'
import styles from './styles.module.css'
import buttonStyles from 'app/buttons/styles.module.css'
import styling from 'styling/styles.module.css'


class Search extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        const { } = this.props;
        return (
            <div className={`container ${styles.searchContainer}`}>
                <div className="row no-gutters">
                    <div className={`col ${styles.topicSearch}`}>
                        TBD
                    </div>
                </div>
            </div>
        )
    }
}

export default Search
