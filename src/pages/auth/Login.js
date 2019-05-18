import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import * as axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import {loginRequest} from "../../actions";

const mapStateToProps = state => ({
    username: state.auth.username,
    password: state.auth.password,
    error: state.auth.error
});

class Login extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: '',
        error: ''
    };

    login = (e) => {
        e.preventDefault();
        const requestUrl = `https://forge-development.herokuapp.com/login/admin`

        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(JSON.stringify(user))
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8'

        fetch(requestUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token} `
                },
                body: JSON.stringify(user)
            }
        )
            .then(data => {
                return data.json()

            })
            .then(data => {
                console.log(data);
                if (data.errors && data.errors.length > 0) {
                    this.setState({error: data.errors[0].msg})
                }
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    this.props.dispatch(loginRequest({'name': 'name', 'password': 'name'}));
                }

            })
            .catch(err => {
                this.setState({error: err.message})
                console.error(err);
            });
    };

    changeInput = (title, value) => {
        this.setState({[title]: value});
    };

    render() {
        const {error} = this.state;

        return (
            <div className="form-page__wrapper login_container">
                <h2 className="form-page__form-heading">Please Login In</h2>
                <form className="form">
                    {error ? <ErrorMessage error={error}/> : null}
                    <input
                        className="form__field-input"
                        type="text"
                        onChange={e => this.changeInput('username', e.target.value)}
                        placeholder="username"
                    />

                    <input
                        className="form__field-input"
                        type="password"
                        onChange={e => this.changeInput('password', e.target.value)}
                        placeholder="password"
                    />

                    <button className="form__submit-btn" onClick={e => this.login(e)}>
                        Log in
                    </button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    password: PropTypes.string,
    error: PropTypes.string,
    username: PropTypes.string,
    data: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Login);
