//custom selector
import {createSelector} from 'reselect';

// const selectSpots = (store) => store.spots;
// export const getSpots = createSelector(currentUser, (spots) => Object.values(spots));
export const getSpots = createSelector(
    (state) => state.spots,
    (allSpots) => Object.values(allSpots)
)

//token verification
import { csrfFetch } from "./csrf";

//action-type constants
const LOAD_SPOTS = 'session/LOAD_SPOTS';
const SINGLE_SPOT = 'session/SINGLE_SPOT';
const REMOVE_SPOT = 'session/REMOVE_SPOT';
const UPDATE_SPOT = 'session/UPDATE_SPOT'

//action-creators
export const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const single = (spot) => ({
    type: SINGLE_SPOT,
    spot
});

export const remove = (spotId) => ({
    type: REMOVE_REVIEW,
    spotId
});

export const update = (spot) => ({
    type: UPDATE_REVIEW,
    spot
});

//thunk actions
export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')

    // console.log('I AM IN THE ACTION')

    if( res.status === 200 ){

        const spots = await res.json();

        // console.log('SPOTS HAVE BEEN FOUND  ----->', spots)

        dispatch(load(spots));
        return null;
    } else {
        const errors = res.errors;
        // console.log('IM A PROBLEM', errors)
        return errors;
    }
};

export const singleSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`)
    // console.log('I AM IN THUNK')

    if ( res.status === 200 ) {
        // console.log('I AM IN THUNK')
        const info = await res.json();

        dispatch(single(info));
        return info;
    } else {
        const errors = res.errors;

        // console.log('IM THE PROBLEM HELLO')

        return errors;
    }
};

// export const signUp = (data) => async dispatch => {
//     const res = await csrfFetch('/api/users', {
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })

//     if( res.status === 201 || res.ok ){
//         const user = await res.json();

//         dispatch(load(user));
//         return null;
//     } else {
//         const errors = res.errors;

//         return errors;
//     }
// };

// export const logout = (user) => async dispatch => {
//     const res = await csrfFetch('/api/session',{
//         method: 'DELETE',
//     })

//     if ( res.ok ) {
//         // const user = await res.json();

//         dispatch(remove());
//         return res;
//     } else {
//         const errors = res.errors;

//         return errors;
//     }
// };

//reducer
const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SPOTS:{
            const spotState = {};
            // console.log('DO I MAKE IT ?', action.user)
            action.spots.forEach((spot) => {
                spotState[spot.id] = spot;
            });
            return spotState;
        }
        case SINGLE_SPOT:
            {const newState = { ...state, [action.spot.id]: action.spot };
            // console.log('BEFORE ----> \n\n\n',state, 'AFTER ---> \n\n\n\n', newState)
            return newState}
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        case REMOVE_SPOT:{
            const spotState = { ...state }
            delete spotState[action.spotId];
            return spotState
        }
        default:
            return state
    }
}

export default spotsReducer;