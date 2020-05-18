import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
const initialState = {

};

function rootReducer(state, action){
    console.log(action.type);
    switch(action.type) {
        case 'GET_USERS_SUCCESS':
            return {users: action.json.users};
    }
    return state
}

export default function configureStore() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    return store;
}