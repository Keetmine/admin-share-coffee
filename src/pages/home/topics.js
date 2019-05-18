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
        const requestUrl = 'https://forge-development.herokuapp.com/api/events/';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8'

        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token} `
            },
        })
            .then(blob => blob.json())
            .then(events => {
                console.log(events);

                this.setState({events: events});
            });
    }


    render() {
        const {events} = this.state;
        return (
                events.map(event => (
                    <div key={event.id}>
                        <div><Link to={{pathname: `/topic/${event._id}`}}>{event.title}</Link></div>
                        <div><span>Place: </span><span>{event.location}</span></div>
                        {/*<div><span>Time: </span><span>{event.event.nextDates}</span></div>*/}
                        <button>Generate pairs</button>
                    </div>
                ))
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
