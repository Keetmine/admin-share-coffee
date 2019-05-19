import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";

class Topics extends Component {

    state = {
        users: [],
        banned: false,
        activeFilter: '',
        up: '',
        userId: ''
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = "https://forge-development.herokuapp.com/api/users/"
        const token = localStorage.getItem('token')

        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token} `
            },
        })
            .then(blob => blob.json())
            .then(users => {
                console.log(users);
                if (users.errors && users.errors.length > 0) {
                    this.setState({error: users.errors[0].msg})
                }
                this.setState({users: users});
            });
    }

    toggle = (user) => {
        // this.state.userId === '' ? this.setState({userId: id}) : this.setState({userId: ''});
        const requestUrl =  `https://forge-development.herokuapp.com/api/users/ban/${user._id}`;
        const token = localStorage.getItem('token')
        const status = {
            "ban": {
                "status": !user.banned.status
            }
        }
        fetch(requestUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token} `
                },
                body: JSON.stringify(status)
            }
        )
            .then(data => {
                return data.json()
            })
            .then(data => {
                console.log(data);
                if (data.errors && data.errors.length > 0) {
                    this.setState({error: data.errors[0].msg})
                } else {
                    this.getData()
                }

            })
            .catch(err => {
                this.setState({error: err.message})
                console.error(err);
            });
    }


    filter = (filter) => {
        this.setState({activeFilter: filter})
        if (this.state.activeFilter === filter) {
            this.setState({up: filter})
        }
        if (this.state.up === filter) {
            this.setState({up: ''})
        }
    };

    render() {
        const {users, banned, activeFilter, up, error} = this.state;
        return (
            <div>
                <table className={'user_block'}>
                    <thead>
                    <tr>
                        <th className={`${activeFilter === 'Username' ? 'active' : ''} ${up === 'Username' ? 'up' : ''}`}
                            onClick={() => this.filter('Username')}>Username
                        </th>
                        <th className={`${activeFilter === 'Team' ? 'active' : ''} ${up === 'Team' ? 'up' : ''}`}
                            onClick={() => this.filter('Team')}>Team
                        </th>
                        <th className={`${activeFilter === 'Registration' ? 'active' : ''} ${up === 'Registration' ? 'up' : ''}`}
                            onClick={() => this.filter('Registration')} colSpan={2}>Registration Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 ? users.map(user => (
                            <tr key={user.id} className={`${user.banned.status ? 'bannedUser' : ''}`}>
                                <td>{user.username}</td>
                                <td>team</td>
                                <td>registration date</td>
                                <td>
                                    <button onClick={() => this.toggle(user)}>{!user.banned.status ? 'ban' : 'unban'}</button>
                                </td>
                                {/*<div>*/}
                                    {/*Are you sure you want to banned user?*/}
                                    {/*<span onClick={this.clear} style={{marginLeft: '10px'}}>Cancel</span>*/}
                                    {/*<button onClick={this.delete} style={{marginLeft: '10px'}}>Ban</button>*/}
                                {/*</div>*/}
                            </tr>
                        )
                        )

                        :
                        <tr>
                            <td>Users is empty</td>
                        </tr>
                    }

                    </tbody>
                </table>
                {error ? <ErrorMessage error={error}/> : null}
            </div>

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