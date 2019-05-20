import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ErrorMessage from "../../components/ErrorMessage";
import requests from "../../helpers/requests";
import {Button, ButtonText} from "../../ui/components/button";

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    currentlySending: state.auth.currentlySending
});

class Teams extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        teams: [],
        deleteContent: '',
        isShowAdding: false,
        team: '',
        error: '',
        success: false

    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = 'https://forge-development.herokuapp.com/api/departments/';

        requests.get(requestUrl)
            .then(data => {
                this.setState({
                    teams: data.object,
                    error: data.message
                });
            });
    }

    toggle = (id) => {
        console.log(id)
        this.setState({deleteContent: id})
    }

    clear = () => {
        this.setState({deleteContent: ''})
    }

    delete = () => {
        console.log('delete')
        this.clear()
    }

    changeInput = (value) => {
        this.setState({team: value});
    };

    toggleAdding = () => {
        this.setState({isShowAdding: !this.state.isShowAdding})
    }

    adding = () => {
        const requestUrl = 'https://forge-development.herokuapp.com/api/departments/';
        const token = localStorage.getItem('token')
        const department = {
            title: this.state.team,
            description: ''
        }
        fetch(requestUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token} `
                },
                body: JSON.stringify(department)
            }
        )
            .then(data => {
                return data.json()
            })
            .then(data => {
                console.log(data);
                if (data.errors && data.errors.length > 0) {
                    this.setState({error: data.errors[0].msg})
                } else {
                    this.toggleAdding()
                    this.setState({success: true})
                    this.getData()
                }

            })
            .catch(err => {
                this.setState({error: err.message})
                console.error(err);
            });
    }


    render() {
        const {teams, deleteContent, isShowAdding, error, success} = this.state;
        return (
            error ? <ErrorMessage error={error}/> :
                <div style={{textAlign: 'left'}}>
                    {teams && teams.length > 0 && teams.map(team => (
                        <div key={team._id} className={'team_block'}>
                            <span>{team.title}</span>
                            <div className='toggle_delete'>
                                {deleteContent !== team._id ?
                                    <img src={require('../../assets/img/close.svg')} alt=''
                                         onClick={() => this.toggle(team._id)}/>
                                    :
                                    <div>
                                        Are you sure you want to delete?
                                        <span onClick={this.clear} style={{marginLeft: '10px'}}>Cancel</span>
                                        <button onClick={this.delete} style={{marginLeft: '10px'}}>Delete</button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                    {!isShowAdding ?
                        <Button onClick={this.toggleAdding} style={{marginTop: '10px'}} >Add team</Button>
                        :
                        <div>
                            <input
                                className="form__field-input"
                                type="text"
                                onChange={e => this.changeInput(e.target.value)}
                                placeholder="Department name"
                            />
                            <Button onClick={this.adding} style={{marginRight: '10px'}}>Save</Button>
                            <ButtonText onClick={this.toggleAdding}>Cancel</ButtonText>
                        </div>
                    }
                </div>

        );
    }


}

Teams.propTypes = {
    loggedIn: PropTypes.bool,
    currentlySending: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Teams);
