import React from 'react'
import { Link, Route } from 'react-router-dom'

import styles from 'app/main/config/styles.module.css'
import { container as BotConfig } from 'app/main/config/services/bot'
import { container as DailyBonusConfig } from 'app/main/config/services/daily_bonus'
import { container as UserAccountsConfig } from 'app/main/config/services/user_accounts'
import { container as UserDataConfig } from 'app/main/config/services/user_data'


class Config extends React.Component {
    render () {
        const { match, location, anyBotDirtyFlagSet,
            anyDailyBonusDirtyFlagSet, anyUserAccountsDirtyFlagSet, anyUserDataDirtyFlagSet,
            anyMatchmakingProcessorDirtyFlagSet } = this.props;
        return (
            <div className={`container-fluid ${styles.config}`}>
                <div className="row">
                    <div className={`col-md-auto ${styles.servicesCol}`}>
                        <div className={styles.servicesTitle}>
                            Services
                        </div>
                        <ul className={styles.services}>
                            <li>
                                <Link to={`${match.url}/bot`} className={`${location.pathname == `${match.path}/bot` ? styles.active : ""} ${styles.firstService}`}>
                                    {`Bot${anyBotDirtyFlagSet ? ' *' : ''}`}
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/daily_bonus`} className={`${location.pathname == `${match.path}/daily_bonus` ? styles.active : ""}`}>
                                    {`Daily Bonus${anyDailyBonusDirtyFlagSet ? ' *' : ''}`}
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/user_accounts`} className={location.pathname == `${match.path}/user_accounts` ? styles.active : ""}>
                                    {`User Accounts${anyUserAccountsDirtyFlagSet ? ' *' : ''}`}
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/user_data`} className={`${location.pathname == `${match.path}/user_data` ? styles.active : ""} ${styles.lastService}`}>
                                    {`User Data${anyUserDataDirtyFlagSet ? ' *' : ''}`}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`col ${styles.serviceConfig}`}>
                        <Route path={`${match.path}/bot`} component={BotConfig} />
                        <Route path={`${match.path}/daily_bonus`} component={DailyBonusConfig} />
                        <Route path={`${match.path}/user_accounts`} component={UserAccountsConfig} />
                        <Route path={`${match.path}/user_data`} component={UserDataConfig} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Config
