//custom selector
import {createSelector} from 'reselect';

export const getSpots = createSelector(
    (state) => state.spots,
    (allSpots) => Object.values(allSpots)
)

//token verification
import { csrfFetch } from "./csrf";

//action-type constants
const LOAD_SPOTS = 'session/LOAD_SPOTS';
const RECEIVE_SPOT = 'session/RECEIVE_SPOT';
const REMOVE_SPOT = 'session/REMOVE_SPOT';
const UPDATE_SPOT = 'session/UPDATE_SPOT'

//action-creators
export const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const receive = (spot) => ({
    type: RECEIVE_SPOT,
    spot
});

export const remove = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
});

export const update = (spot) => ({
    type: UPDATE_SPOT,
    spot
});

//thunk actions
export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')

    // console.log('I AM IN THE ACTION')

    if( res.status === 200 ){

        const spots = await res.json();

        // console.log('SPOTS HAVE BEEN FOUND  ----->', spots)

        dispatch(load(spots.Spots));
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

        dispatch(receive(info));
        return info;
    } else {
        const errors = res.errors;

        // console.log('IM THE PROBLEM HELLO')

        return errors;
    }
};

export const createSpot = (data) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if( res.status === 201 || res.ok ){
        const spot = await res.json();

        dispatch(receive(spot));
        return spot;
    } else {
        const errors = res.errors;

        return errors;
    }
};

export const editSpot = (data ,id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if( res.status === 201 || res.ok ){
        const newSpot = await res.json();

        dispatch(update(newSpot));
        return newSpot;
    } else {
        const errors = res.errors;

        return errors;
    }
};

export const deleteSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`,{
        method: 'DELETE',
    })

    if ( res.ok ) {
        // const user = await res.json();

        dispatch(remove(id));
        return res;
    } else {
        const errors = res.errors;

        return errors;
    }
};

//reducer
const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SPOTS:{
            const spotState = {};
            // console.log('DO I MAKE IT ?', action.spots)
            action.spots.forEach((spot) => {
                spotState[spot.id] = spot;
            });
            return spotState;
        }
        case RECEIVE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
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