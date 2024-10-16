// import {createSelector} from 'reselect';

// const currentUser = (store) => store.session;
// export const getUser = createSelector(currentUser, (session) => session.user);

import { csrfFetch } from "./csrf";

//action-type constants
const SET_USER = 'session/SET_USER ';
const RESTORE_USER = 'session/RESTORE_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER'

//action-creators
export const set = (user) => ({
    type: SET_USER,
    user
});

// export const restore = (user) => ({
//     type: RESTORE_USER,
//     user
// });

export const remove = () => ({
    type: REMOVE_USER,
});

export const update = (user) => ({
    type: UPDATE_USER,
    user
});

//thunk actions
export const login = (credentials) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    if( res.status === 200 ){
        const data = await res.json();

        dispatch(set(data.user));
        return res;
    } else {
        const errors = res.errors;

        return errors;
    }
};

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session')

    if ( res.status === 200 ) {
        const data = await res.json();

        dispatch(set(data.user));
        return res;
    } else {
        const errors = res.errors;

        return errors;
    }
};

export const signUp = (data) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if( res.status === 201 || res.ok ){
        const user = await res.json();

        dispatch(load(user));
        return null;
    } else {
        const errors = res.errors;

        return errors;
    }
};

export const logout = (user) => async dispatch => {
    const res = await csrfFetch('/api/session',{
        method: 'DELETE',
    })

    if ( res.ok ) {
        // const user = await res.json();

        dispatch(remove());
        return res;
    } else {
        const errors = res.errors;

        return errors;
    }
};

//selectors

//normalizer

//reducer
const sessionReducer = (state = { user: null }, action) => {
    switch(action.type) {
        case SET_USER:{
            // const sessionState = {...state};
            // console.log('DO I MAKE IT ?', action.user)
            // sessionState.user = action.user;
            // return sessionState;
            return { ...state, user: action.user };
        }
        case REMOVE_USER:{
            // const sessionState = {...state, user: null}
            // delete sessionState[action.userId];
            // return sessionState
            return { ...state, user: null };
        }
        default:
            return state
    }
}

export default sessionReducer;