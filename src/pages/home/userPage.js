import React from 'react';
import {Tab, TabContainer} from '../../ui/core/home';
import UserTopics from "./userTopics";
import Login from '../auth/Login';
import UserInfo from "./userInfo";
import HomeDashboard from './home';
import UserLogs from "./userLogs";
import Navbar from "../../components/Navbar";

class UserPage extends React.Component {
    state = {
        activeTab: 'UserInfo'
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.setState({isLogin: true})
        }
    }

    setLogin = (state) => {
        this.setState({isLogin: state})
    }

    update = () => {
        this.setState({ state: this.state });
    }

    openTab = tabName => {
        this.setState({activeTab: tabName});
    };


    render() {
        const {activeTab} = this.state;

        return (
            <div>
                <Navbar setLogin={this.setLogin} isLogin={this.state.isLogin}/>
                <h1>About user</h1>
                {!this.state.isLogin ?
                    <Login history={this.props.history}
                           update={this.update}
                           setLogin={this.setLogin}/>
                    :
                    <userInfo />
                }
                <TabContainer>
                    <Tab onClick={() => this.openTab('UserInfo')} active={activeTab === 'UserInfo'}>User</Tab>
                    <Tab onClick={() => this.openTab('UserTopics')} active={activeTab === 'UserTopics'}>Topics</Tab>
                    <Tab onClick={() => this.openTab('UserLogs')} active={activeTab === 'UserLogs'}>Logs</Tab>
                </TabContainer>
                {activeTab === 'UserInfo' && (
                    <UserInfo/>
                )}
                {activeTab === 'UserTopics' && (
                    <UserTopics/>
                )}
                {activeTab === 'UserLogs' && (
                    <UserLogs />
                )}
            </div>
        );
    }
}

export default (UserPage);
