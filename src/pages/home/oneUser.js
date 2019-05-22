import React from 'react';
import {Tab, TabContainer} from '../../ui/core/home';
import UserTopics from "./userTopics";
import UserInfo from "./userInfo";
import UserLogs from "./userLogs";
import requests from "../../helpers/requests";

class OneUser extends React.Component {
    state = {
        activeTab: 'UserInfo',
          user: [],
          error: '',
    };

      componentDidMount() {
        this.getData();
      }

      getData() {
        const requestUrl = `https://forge-development.herokuapp.com/api/users/${this.props.match.params.id}`

        requests.get(requestUrl)
          .then(data => {
            this.setState({
              user: data.object,
              error: data.message
            })
          });
      }


    openTab = tabName => {
        this.setState({activeTab: tabName});
    };


    render() {
        const {activeTab, user, error} = this.state;

        return (
            <div>
                <h1>About user</h1>

                <TabContainer>
                    <Tab onClick={() => this.openTab('UserInfo')} active={activeTab === 'UserInfo'}>User</Tab>
                    <Tab onClick={() => this.openTab('UserTopics')} active={activeTab === 'UserTopics'}>Topics</Tab>
                    <Tab onClick={() => this.openTab('UserLogs')} active={activeTab === 'UserLogs'}>Logs</Tab>
                </TabContainer>
                {activeTab === 'UserInfo' && (
                    <UserInfo user={user} error={error}/>
                )}
                {activeTab === 'UserTopics' && (
                    <UserTopics events={user.events} error={error}/>
                )}
                {activeTab === 'UserLogs' && (
                    <UserLogs log={user.logs} error={error}/>
                )}
            </div>
        );
    }
}

export default OneUser;
