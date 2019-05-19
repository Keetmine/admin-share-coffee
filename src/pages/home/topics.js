import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";

class Topics extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        events: [],
        error: ''
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = 'https://forge-development.herokuapp.com/api/events/';
        const token = localStorage.getItem('token')

        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token} `
            },
        })
            .then(blob => blob.json())
            .then(events => {
                console.log(events);
                if (events.errors && events.errors.length > 0) {
                    this.setState({error: events.errors[0].msg})
                }
                this.setState({events: events});
            });
    }


    render() {
        const {events, error} = this.state;
        return (
            <div>
                {events && events.length > 0 && events.map(event => (
                    <div key={event.id} className={'one-topic'}>
                        <Link to={{pathname: `/topic/${event._id}`}} className={'title'}>{event.title}</Link>
                        <div className={'subscribers'}>(0 Subscribers)</div>
                        <span>Place: </span>
                        <div>{event.address}</div>
                        <span>Time:</span>
                        <div>{event.options.times}</div>
                        {/*<button>Generate pairs</button>*/}
                    </div>
                ))}
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
