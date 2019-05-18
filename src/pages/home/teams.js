import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
        team: ''

    };

    componentDidMount() {
        this.getData();
    }


    getData() {
        const requestUrl = 'https://forge-development.herokuapp.com/api/departments/';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8'

        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token} `
            },
        })
            .then(blob => blob.json())
            .then(teams => {
                this.setState({teams: teams});
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
        this.setState({deleteContent: ''})
    }

    changeInput = (title, value) => {
        this.setState({[title]: value});
    };

    toggleAdding = () => {
        this.setState({isShowAdding: !this.state.isShowAdding})
    }


    render() {
        const {teams, deleteContent, isShowAdding} = this.state;
        console.log(deleteContent)
        return (
            <div>
                {teams.map(team => (
                <div key={team.id} className={'team_block'}>
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
                    <button onClick={this.toggleAdding}>Add team</button>
                    :
                    <div>
                        <input
                            className="form__field-input"
                            type="password"
                            onChange={e => this.changeInput('team', e.target.value)}
                            placeholder="password"
                        />
                        <button>Save</button>
                        <button onClick={this.toggleAdding}>Cancel</button>
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
