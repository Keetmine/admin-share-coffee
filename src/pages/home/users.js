import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";

class Topics extends Component {

    state = {
        users: [],
        unsortedUser: [],
        userLength: 0,
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
                this.setState({
                    users: users,
                    unsortedUser: users,
                    userLength: users.length
                });
                this.pagination(10, 1)
            });
    }

    toggle = (banStatus) => {
        this.setState({banned: !banStatus})
    }

    pagination(pageSize, currentPage) {
        const data = this.state.unsortedUser;
        const upperLimit = currentPage * pageSize;
        this.setState({users: data.slice((upperLimit - pageSize), upperLimit)})
    }

    filter = (filter) => {
        this.setState({activeFilter: filter})
        if (this.state.activeFilter === filter) {
            this.setState({up: filter})
        } else {
            this.setState({up: ''})
        }
        if (this.state.up === filter) {
            this.setState({up: ''})
        }
    }

    render() {
        const {users, banned, activeFilter, up, error, userLength} = this.state;
        return (
            <div>
                {users && users.length > 0 ?
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
                            {users.map(user => (
                                <tr key={user._id}>
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
                        <Pagination length={userLength}
                                    change={(pageSize, currentPage) => this.pagination(pageSize, currentPage)}/>
                    </div>
                    :
                    <div>Users is empty</div>
                }
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
