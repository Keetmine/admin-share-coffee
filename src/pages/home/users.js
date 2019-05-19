import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";

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
                        )) :
                        <tr>
                            <td>Users is empty</td>
                        </tr>}
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
