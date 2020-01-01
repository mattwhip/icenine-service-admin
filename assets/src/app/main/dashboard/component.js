import React from 'react'

import { container as SummaryCard } from 'app/main/dashboard/cards/summary'
import styles from 'app/main/dashboard/styles.module.css'

class Dashboard extends React.Component {
    render () {
        return (
            <div className={`container-fluid ${styles.dashboard}`}>
                <div className="row">
                    <div className="col">
                        <SummaryCard/>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
