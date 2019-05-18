import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
        events: []
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = "https://forge-development.herokuapp.com/api/users/"

        fetch(requestUrl)
            .then(blob => blob.json())
            .then(events => {
                console.log(events);

                this.setState({events: events});
            });
    }


    render() {
        const {events} = this.state;
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
                {events.map(event => (
                    <tr>
                        <td>{event.username}</td>
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
