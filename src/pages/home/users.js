import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    currentlySending: state.auth.currentlySending
});

class Topics extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        users: []
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


    render() {
        const {users} = this.state;
        return (
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Team</th>
                    <th>Registration Date</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr>
                        <td>{user.username}</td>
                        <td>team</td>
                        <td>registration date</td>
                        <button>click me</button>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }


}

Topics.propTypes = {
    loggedIn: PropTypes.bool,
    currentlySending: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Topics);
