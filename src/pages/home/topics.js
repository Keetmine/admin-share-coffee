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
        const requestUrl = "https://forge-development.herokuapp.com/api/events/"

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
            <div>
                {events.map(event => (
                    <div>
                        <div key={event.id}><Link to={{pathname: `/topic/${event._id}`}}>{event.title}</Link></div>
                        <div><span>Place: </span><span>{event.location}</span></div>
                        <div><span>Time: </span><span>{event.event.nextDates}</span></div>
                        <button>Generate pairs</button>
                    </div>
                ))}
            </div>
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
