import React from 'react';
import {Tab, TabContainer} from '../../ui/core/home';
import Topics from "./topics";
import Users from "./users";
import Teams from "./teams";


import UserPage from "./userPage" // ---------------------------------



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


                    {/*Временно для теста страницы юзера*/}
                    <Tab onClick={() => this.openTab('UserPage')} active={activeTab === 'UserPage'}>Page</Tab>
                    {/*-----------------------------------*/}


                </TabContainer>
                {activeTab === 'Topics' && (
                    <Topics/>
                )}
                {activeTab === 'Users' && (
                    <Users/>
                )}
                {activeTab === 'Teams' && (
                    <Teams/>
                )}



                {/*--------------------------------*/}
                {activeTab === 'UserPage' && (
                    <UserPage/>
                )}
                {/*-------------------------------*/}



            </div>
        );
    }
}

export default (HomeDashboard);
