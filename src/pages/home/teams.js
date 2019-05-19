import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginRequest} from "../../actions";
import ErrorMessage from "../auth/Login";

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

    changeInput = (value) => {
        console.log(value)
        this.setState({team: value});
    };

    toggleAdding = () => {
        this.setState({isShowAdding: !this.state.isShowAdding})
    }

    adding = () => {
        const requestUrl = 'https://forge-development.herokuapp.com/api/departments/';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8'
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
                            type="text"
                            onChange={e => this.changeInput(e.target.value)}
                            placeholder="Department name"
                        />
                        <button onClick={this.adding}>Save</button>
                        <button onClick={this.toggleAdding}>Cancel</button>
                    </div>
                }
                {error ? <ErrorMessage error={error}/> : null}
                {/*{success ? <ErrorMessage success/> : null}*/}

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
