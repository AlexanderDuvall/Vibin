import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

function getUsers() {
    console.log('getUsers() Action')
    /*
    return dispatch => (
        dispatch({type: GET_USERS_REQUEST});
        return fetch('users.json')
            .then(response => response.json())
            .then(json => dispatch(getUsersSuccess(json)))
            .catch(error => console.log(error));
    );*/
};

export function getUsersSuccess(json){
    return {
        type: GET_USERS_SUCCESS,
        json
    };
};

class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        <button className="" onClick={() => this.props.getUsers()}>getUsers</button>

      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
    users: state => state.users
});

const mapDispatchToProps = { getUsers};

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);