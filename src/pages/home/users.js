import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Topics extends Component {

    state = {
        users: [],
        banned: false,
        activeFilter: '',
        up: ''
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = "https://forge-development.herokuapp.com/api/users/"
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8'

        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token} `
            },
        })
            .then(blob => blob.json())
            .then(users => {
                console.log(users);
                this.setState({users: users});
            });
    }

    toggle = (banStatus) => {
        this.setState({banned: !banStatus})
    }

    filter = (filter) => {
        this.setState({activeFilter: filter})
        if (this.state.activeFilter === filter) {
            this.setState({up: filter})
        }
        if (this.state.up === filter) {
            this.setState({up: ''})
        }
    }

    render() {
        const {users, banned, activeFilter, up} = this.state;
        return (
            <table className={'user_block'}>
                <thead>
                <tr>
                    <th className={`${activeFilter === 'Username' ? 'active': ''} ${up === 'Username' ? 'up': ''}`}
                        onClick={() => this.filter('Username')}>Username</th>
                    <th className={`${activeFilter === 'Team' ? 'active' : ''} ${up === 'Team' ? 'up' : ''}`}
                        onClick={() => this.filter('Team')}>Team</th>
                    <th className={`${activeFilter === 'Registration' ? 'active': ''} ${up === 'Registration' ? 'up' : ''}`}
                        onClick={() => this.filter('Registration')} colSpan={2}>Registration Date</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>team</td>
                        <td>registration date</td>
                        <td>
                            {banned ?
                                <button onClick={() => this.toggle(banned)}>unban</button>
                                :
                                <button onClick={() => this.toggle(banned)}>ban</button>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }


}

Topics.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default (Topics);
