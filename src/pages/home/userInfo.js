import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";
import {Dropdown, DropdownContent, DropdownItem} from "../../ui/components/dropdown";
import requests from "../../helpers/requests";
import {Button, ButtonText} from "../../ui/components/button";

class Topics extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return (
            <div key={user._id} className={''}>
                <img src={`${user.avatar}`} alt="user photo"/>
                <h2>{user.username} </h2>
                <h3>{user.firstName + ' ' + user.lastName}</h3>
                <span>team: {user.department}</span>
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
