import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tab, TabContainer} from "../../ui/core/home";

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    currentlySending: state.auth.currentlySending
});

class TopicEditer extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        event: [],
        title: ''
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = `https://forge-development.herokuapp.com/api/events/${this.props._id}`

        fetch(requestUrl)
            .then(event => {
                console.log(event);

                this.setState({event: event});
            });
    }
    updateDate() {

        console.log(this.state.title)
    }

    changeInput(event) {
        console.log(event)
        this.setState({title: event.target.value});
    }


    render() {
        const {event, title} = this.state;
        return (
            <div>
                <form onSubmit={this.updateDate}>
                    <label>
                        Title:
                        <input type="text" onChange={this.changeInput} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }


}

TopicEditer.propTypes = {
    loggedIn: PropTypes.bool,
    currentlySending: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(TopicEditer);
