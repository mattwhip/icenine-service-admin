import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import Sidebar from "react-sidebar";

import styles from './styles.module.css'
import { container as RecentMatches } from 'app/main/developer/tools/kafkaReader/recentMatches'
import { container as Stats } from 'app/main/developer/tools/kafkaReader/stats'
import { container as Reader } from 'app/main/developer/tools/kafkaReader/reader'
import { container as Export } from 'app/main/developer/tools/kafkaReader/export'


class KafkaReader extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            activeTab: '1',
            sidebarOpen: false,
        };
        this.setTab = this.setTab.bind(this);
        this.createSidebarContent = this.createSidebarContent.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    setTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    createSidebarContent() {
        return (
            <div className={`col-sm-auto ${styles.findCol}`}>
                <Nav tabs>
                    <NavItem>
                        <div className={this.state.activeTab === '1' ? styles.activeTab : ''}>
                            <NavLink onClick={() => { this.setTab('1'); }}>
                                {`Recent Matches`}
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className={this.state.activeTab === '2' ? styles.activeTab : ''}>
                            <NavLink onClick={() => { this.setTab('2'); }}>
                                {`Stats`}
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className={this.state.activeTab === '3' ? styles.activeTab : ''}>
                            <NavLink onClick={() => { this.setTab('3'); }}>
                                {`Export`}
                            </NavLink>
                        </div>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ScrollArea
                            speed={0.8}
                            className={styles.tabContent}
                            vertical={true}
                            horizontal={false}>
                            <div className={styles.tabScrollContent}>
                                <RecentMatches/>
                            </div>
                        </ScrollArea>
                    </TabPane>
                    <TabPane tabId="2">
                        <ScrollArea
                            speed={0.8}
                            className={styles.tabContent}
                            vertical={true}
                            horizontal={false}>
                            <div className={`${styles.tabScrollContent}`}>
                                <Stats/>
                            </div>
                        </ScrollArea>
                    </TabPane>
                    <TabPane tabId="3">
                        <ScrollArea
                            speed={0.8}
                            className={styles.tabContent}
                            vertical={true}
                            horizontal={false}>
                            <div className={`${styles.tabScrollContent}`}>
                                <Export/>
                            </div>
                        </ScrollArea>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render () {
        const { } = this.props;
        return (
            <Sidebar
                sidebar={this.createSidebarContent()}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
                pullRight={true} >
                <div className={`container-fluid ${styles.kafkaReaderContainer}`}>
                    <div className={`${styles.kafkaReader}`}>
                        <div className={`row no-gutters`}>
                            <div className={`col ${styles.readerCol}`}>
                                <Reader onOpenSidebar={() => {this.onSetSidebarOpen(true)}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default KafkaReader
