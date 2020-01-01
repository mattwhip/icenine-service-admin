import React from 'react'
import { Icon } from "react-icons-kit"
import { ic_phone_android } from 'react-icons-kit/md/ic_phone_android'

import styles from 'app/main/users/cards/devices/styles.module.css'
import cardStyles from 'app/main/users/cards/styles.module.css'
import formatting from 'formatting'


class DevicesCard extends React.Component {

    constructor (props) {
        super(props);

        this.createDeviceListItems = this.createDeviceListItems.bind(this);
    }

    render () {
        const { devices, disabled } = this.props;
        const deviceListItems = this.createDeviceListItems(devices, disabled);
        return (
        <div className={cardStyles.card}>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-sm-auto col-xs">
                        <div className={cardStyles.cardIcon}>
                            <Icon icon={ic_phone_android} size={28}/>
                        </div>
                    </div>
                    <div className="col-sm col-xs">
                        <div className={cardStyles.cardTitle}>Devices</div>
                    </div>
                    <div className="col-sm-auto col-xs">
                        <div disabled={disabled} className={cardStyles.cardSettings}>
                            {/* <Icon icon={ic_settings} size={24}/> */}
                        </div>
                    </div>
                </div>
                <div className={cardStyles.cardSpacer}/>
                <div className="row">
                    <div className="col">
                        <div className={cardStyles.cardBody}>
                            <ul className={styles.devicesList}>
                                {deviceListItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    createDeviceListItems (devices, disabled) {
        // Create a blank device to show headers if there are no devices
        let showDisabled = devices.length == 0 ? true : disabled;
        if (devices.length == 0) {
            devices = [{
                createdAt: 0,
                guid: '',
            }]
        }
        const items = devices.map(function(device, index) {
            let createdDate = new Date(device.createdAt * 1000);
            let guidDisplay = formatting.dashedString(device.guid, 4);
            return (
                <li key={index}>
                    <table>
                        <tbody>
                            <tr>
                                <th className={cardStyles.cardBodyHeader}>GUID:</th>
                                <td>{showDisabled ? '' : guidDisplay}</td>
                            </tr>
                            <tr>
                                <th className={cardStyles.cardBodyHeader}>Created:</th>
                                <td>{showDisabled ? '' : createdDate.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th className={cardStyles.cardBodyHeader}>Model:</th>
                                <td>{showDisabled ? '' : device.modelInfo}</td>
                            </tr>
                            <tr>
                                <th className={cardStyles.cardBodyHeader}>OS:</th>
                                <td>{showDisabled ? '' : device.operatingSystem}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={index < devices.length - 1 ? cardStyles.cardSpacer : ''}/>
                </li>
            );
        });
        return items;
    }
}

export default DevicesCard
