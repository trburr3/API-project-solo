//custom selector
import {createSelector} from 'reselect';

export const getReviews = createSelector(
    (state) => state.reviews,
    (allReviews) => Object.values(allReviews)
);

//token verification
import { csrfFetch } from "./csrf";

//action-type constants
const LOAD_REVIEWS = 'session/LOAD_REVIEWS';
const SINGLE_REVIEW = 'session/SINGLE_REVIEW';
const REMOVE_REVIEW = 'session/REMOVE_REVIEW';
const UPDATE_REVIEW = 'session/UPDATE_REVIEW'

//action-creators
export const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const single = (review) => ({
    type: SINGLE_REVIEW,
    review
});

export const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const update = (spot) => ({
    type: UPDATE_REVIEW,
    spot
});

//thunk actions
export const getSpotReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)

    // console.log('I AM IN THE ACTION')

    if( res.status === 200 ){

        const reviews = await res.json();

        // console.log('SPOTS HAVE BEEN FOUND  ----->', reviews)

        dispatch(load(reviews));
        return null;
    } else {
        const errors = res.errors;
        // console.log('IM A PROBLEM', errors)
        return errors;
    }
};

//reducer
const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:{
            const reviewState = {};
            // console.log('DO I MAKE IT ?', action.reviews)
            action.reviews.Reviews.forEach((review) => {
                reviewState[review.id] = review;
            });
            return reviewState;
        }
        case SINGLE_REVIEW:
            {const newState = { ...state, [action.review.id]: action.review };
            // console.log('BEFORE ----> \n\n\n',state, 'AFTER ---> \n\n\n\n', newState)
            return newState}
        case UPDATE_REVIEW:
            return { ...state, [action.review.id]: action.review };
        case REMOVE_REVIEW:{
            const reviewState = { ...state }
            delete reviewState[action.reviewId];
            return reviewState
        }
        default:
            return state
    }
}

export default reviewsReducer;