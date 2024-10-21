import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './Reviews.css';

// export const REVIEW_LIST_LOCATOR = data-testid='review-list'
// export const REVIEW_ITEM_LOCATOR = data-testid='review-item'
// export const REVIEW_DATE_LOCATOR = data-testid='review-date'
// export const REVIEW_TEXT_LOCATOR = data-testid='review-text'
// export const REVIEW_BUTTON_LOCATOR = data-testid='review-button'
// export const REVIEW_COUNT_LOCATOR = data-testid='review-count'
// export const REVIEW_HEADING_LOCATOR = data-testid='reviews-heading'

const Reviews = ({ spot, owner, user }) => {
    const [authorized, setAuthorized] = useState(false);

    const reviews = useSelector(reviewActions.getReviews);

    // console.log('I HAVE HIT THE REVIEW COMP',reviews)

    // const user = useSelector(state => Object.values(state.session.user))[0]

    const {firstName, id, lastName} = user

    const info = {firstName, id, lastName}

    // console.log('AM I THE OWNER?', info === owner) //false cant access owner consistently

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(reviewActions.getSpotReviews(spot.id))
    //    console.log('IS IT ME UR LOOKING FOR ', spot.Owner)
    }, [spot, dispatch])

    const reviewItems = reviews.map((review) =>
        <li key={review.id}>
        {/* {console.log('I AM YOUR REVIEW',review)} */}
        <div id="li-review-container" data-testid='review-item'>
            <div id="review-image-container">
            {review.ReviewImages.map((image) =>
                <img src={review.ReviewImages[0]?.url} alt={image.id} key={image.id}/>
            )}
            </div>
            <div id="review-text" data-testid='review-text'>
                {/* <p>Posted by: {review.User.firstName}</p> */}
                <p>{review.review}</p>
                {user === info ?(
                <OpenModalButton
                buttonText="Delete"
                onButtonClick
                modalComponent={<DeleteReviewModal />}
                />
                ) : ("")}
                <br />
                <p data-testid='review-date'>{review.createdAt}</p>
            </div>
        </div>
        </li>
    )
    return (
        <>
            {reviewItems}
        </>
    )
};

export default Reviews;