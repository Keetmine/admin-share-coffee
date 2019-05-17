import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tab, TabContainer} from "../../ui/core/home";
import TopicEditer from "./topicEditer";

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    currentlySending: state.auth.currentlySending
});

class oneTopic extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        event: [],
        activeTab: 'Description',
        isEdit: false
    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = `https://forge-development.herokuapp.com/api/events/${this.props.match.params.id}`

        fetch(requestUrl)
            .then(blob => blob.json())
            .then(event => {
                console.log(event);

                this.setState({event: event});
            });
    }

    openTab(name) {
        this.setState({activeTab: name})
    }

    showEditForm() {
        this.setState({isEdit: true})
    }

    render() {
        const {event, activeTab, isEdit} = this.state;
        return (
            <div>
                <TabContainer>
                    <Tab onClick={() => this.openTab('Description')}
                         active={activeTab === 'Description'}>Description</Tab>
                    <Tab onClick={() => this.openTab('Upcoming')} active={activeTab === 'Upcoming'}>Upcoming</Tab>
                </TabContainer>
                <div>{event.title}</div>
                {activeTab === 'Description' ?
                    <div>
                        {!isEdit
                            ?
                            <div>
                                {event.description}
                                <button onClick={() => this.showEditForm()}>Edit</button>
                            </div>
                            :
                            <TopicEditer id={event._id} />
                        }
                    </div>
                    :
                    <div>
                        All events
                    </div>
                }
            </div>
        );
    }


}

oneTopic.propTypes = {
    loggedIn: PropTypes.bool,
    currentlySending: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(oneTopic);
