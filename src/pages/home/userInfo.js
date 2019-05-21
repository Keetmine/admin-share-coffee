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

    state = {
        user: [],
        error: '',
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        const requestUrl = "https://forge-development.herokuapp.com/api/users/5cde8b1048ef27a251f65ded"

        requests.get(requestUrl)
            .then(data => {
                this.setState({
                    user: data.object,
                    error: data.message
                })
            });
    }

    // toggle = (user) => {
    //     const requestUrl = `https://forge-development.herokuapp.com/api/users/ban/${user._id}`;
    //     const token = localStorage.getItem('token')
    //     const status = {
    //         "ban": {
    //             "status": !user.banned.status
    //         }
    //     }
    //     fetch(requestUrl,
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token} `
    //             },
    //             body: JSON.stringify(status)
    //         }
    //     )
    //         .then(data => {
    //             return data.json()
    //         })
    //         .then(data => {
    //             console.log(data);
    //             if (data.errors && data.errors.length > 0) {
    //                 this.setState({error: data.errors[0].msg})
    //             } else {
    //                 this.getData()
    //             }
    //
    //         })
    //         .catch(err => {
    //             this.setState({error: err.message})
    //             console.error(err);
    //         });
    // }

    render() {
        const {user, error} = this.state;
        return (
            <div key={user._id} className={''}>
                <img src={`${user.avatar}`} alt="user photo"/>
                <h2>{user.username} </h2>
                <h3>{user.firstName + ' ' + user.lastName}</h3>
                <span>team: {user.department}</span>
                {/*<div>*/}
                    {/*{!user.banned.status ?*/}
                        {/*<ButtonText onClick={() => this.toggle(user)}>Ban User</ButtonText>*/}
                        {/*:*/}
                        {/*<Button onClick={() => this.toggle(user)}>Unban</Button>*/}
                    {/*}*/}
                {/*</div>*/}
            </div>
            // console.log(user)
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
