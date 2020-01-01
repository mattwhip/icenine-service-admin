import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon } from "react-icons-kit";
import { tachometer } from 'react-icons-kit/fa/tachometer'
import { userCircleO } from 'react-icons-kit/fa/userCircleO'
import { ic_settings } from 'react-icons-kit/md/ic_settings'
import { hammer } from 'react-icons-kit/ionicons/hammer'
import { informationCircled } from 'react-icons-kit/ionicons/informationCircled'

import { component as Dashboard } from 'app/main/dashboard'
import { component as About } from 'app/main/about'
import { container as Config } from 'app/main/config'
import { container as Users } from 'app/main/users'
import { container as Developer } from 'app/main/developer'
import styles from 'app/main/styles.module.css'

class Main extends React.Component {
    render () {
        const { match, location, anyConfigDirtyFlagSet, anyUserDirtyFlagSet } = this.props;
        return (
            <div>
                <div className={`container-fluid ${styles.topbar}`}>
                    <div className={styles.logo}>Game System Admin</div>
                </div>
                <div className={`container-fluid ${styles.sidemenuContainer}`}>
                    <div className="row">
                        <ul className={`col-sm-auto ${styles.sidemenu}`}>
                            <li>
                                <Link to={match.url} className={match.isExact ? styles.active : ""}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-sm-auto ${styles.sidemenuIcon}`}>
                                                <Icon icon={tachometer} size={24}/>
                                            </div>
                                            <div className={`col ${styles.sidemenuText}`}>
                                                Dashboard
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/users`} className={location.pathname.startsWith(`${match.path}/users`) ? styles.active : ""}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-sm-auto ${styles.sidemenuIcon}`}>
                                                <Icon icon={userCircleO} size={24}/>
                                            </div>
                                            <div className={`col ${styles.sidemenuText}`}>
                                                {`Users${anyUserDirtyFlagSet ? ' *' : ''}`}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/config`} className={location.pathname.startsWith(`${match.path}/config`) ? styles.active : ""}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-sm-auto ${styles.sidemenuIcon}`}>
                                                <Icon icon={ic_settings} size={24}/>
                                            </div>
                                            <div className={`col ${styles.sidemenuText}`}>
                                                {`Configuration${anyConfigDirtyFlagSet ? ' *' : ''}`}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/developer`} className={location.pathname.startsWith(`${match.path}/developer`) ? styles.active : ""}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-sm-auto ${styles.sidemenuIcon}`}>
                                                <Icon icon={hammer} size={24}/>
                                            </div>
                                            <div className={`col ${styles.sidemenuText}`}>
                                                {`Developer`}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/about`} className={location.pathname == `${match.path}/about` ? styles.active : ""}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-sm-auto ${styles.sidemenuIcon}`}>
                                                <Icon icon={informationCircled} size={24}/>
                                            </div>
                                            <div className={`col ${styles.sidemenuText}`}>
                                                About
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <div className={`col ${styles.content}`}>
                            <Route exact path={match.path} component={Dashboard} />
                            <Route path={`${match.path}/users`} component={Users} />
                            <Route path={`${match.path}/config`} component={Config} />
                            <Route path={`${match.path}/developer`} component={Developer} />
                            <Route path={`${match.path}/about`} component={About} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Main
