import React from 'react'
import { Link, Route } from 'react-router-dom'

import styles from './styles.module.css'
import { container as KafkaReader } from 'app/main/developer/tools/kafkaReader'


class Tools extends React.Component {
    render () {
        const { match, location} = this.props;
        return (
            <div className={`container-fluid ${styles.developer}`}>
                <div className="row">
                    <div className={`col-md-auto ${styles.toolsCol}`}>
                        <div className={styles.toolsTitle}>
                            Tools
                        </div>
                        <ul className={styles.tools}>
                            <li>
                                <Link to={`${match.url}/kafka_reader`} className={`${location.pathname == `${match.path}/kafka_reader` ? styles.active : ""} ${styles.firstTool} ${styles.lastTool}`}>
                                    {`Kafka Reader`}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`col ${styles.toolPanel}`}>
                        <Route path={`${match.path}/kafka_reader`} component={KafkaReader} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Tools
