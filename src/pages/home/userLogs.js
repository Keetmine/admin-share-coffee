import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "../../components/ErrorMessage";


class Topics extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {logs, error} = this.props;
        return (
            <div>
              <p>Bans</p>
              {logs && logs.bans && logs.bans.length > 0 && logs.bans.map(ban => (
                  <p>users ban info</p>
              ))}
                {error ? <ErrorMessage error={error}/> : null}

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
