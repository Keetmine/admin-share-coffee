import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ButtonLink} from '../ui/components/button';
import jwt_decode from 'jwt-decode';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.setState({
                user: jwt_decode(token).data
            })
        }
    }

    DoLogout(e) {
        e.preventDefault();
        localStorage.clear();
        this.props.setLogin(false)
    }

    render() {
        const {user} = this.state;
        return (
            <div className='nav'>
                <div className='nav__wrapper'>
                    <Link to='/' className='nav__logo-wrapper'>
                        <img src={require('../assets/img/logo.png')} alt=''/>
                    </Link>
                    {this.props.isLogin ?
                        <div>
                            <div>
                                <i className="fas fa-user"/>
                                <span>{user.firstName} {user.lastName}</span>
                            </div>
                            <ButtonLink to='/' onClick={e => this.DoLogout(e)}>Logout</ButtonLink>
                        </div>
                        :
                        <ButtonLink to='/register'>Sign up</ButtonLink>
                    }
                </div>
            </div>
        );
    }

}

Navbar.propTypes = {
    isLogin: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default (Navbar);
