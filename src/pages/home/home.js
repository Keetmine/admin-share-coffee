import React from 'react';
import {connect} from 'react-redux';
import {Tab, TabContainer} from '../../ui/core/home';
import Topics from "./topics";
import Users from "./users";


const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

class HomeDashboard extends React.Component {
    state = {
        activeTab: 'Topics'
    };

    openTab = tabName => {
        this.setState({activeTab: tabName});
    };

    render() {
        const {activeTab} = this.state;

        return (
            <div>
                <TabContainer>
                    <Tab onClick={() => this.openTab('Topics')} active={activeTab === 'Topics'}>Topics</Tab>
                    <Tab onClick={() => this.openTab('Users')} active={activeTab === 'Users'}>Users</Tab>
                    <Tab onClick={() => this.openTab('Teams')} active={activeTab === 'Teams'}>Teams</Tab>
                </TabContainer>
                {activeTab === 'Topics' && (
                    <Topics/>
                )}
                {activeTab === 'Users' && (
                    <Users/>
                )}
                {activeTab === 'Teams' && (
                    <div>
                        <h2>Teams</h2>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(HomeDashboard);
