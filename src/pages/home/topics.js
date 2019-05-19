import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

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
                <div key={event.id} className={'one-topic'}>
                    <Link to={{pathname: `/topic/${event._id}`}} className={'title'}>{event.title}</Link>
                    <div className={'subscribers'}>(0 Subscribers)</div>
                    <span>Place: </span>
                    <div>{event.address}</div>
                    <span>Time:</span>
                    <div>{event.options.times}</div>
                    {/*<button>Generate pairs</button>*/}
                </div>
            ))
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
