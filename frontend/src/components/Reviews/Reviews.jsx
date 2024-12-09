import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

const Reviews = ({ spot, user }) => {
    // const [authorized, setAuthorized] = useState(false);

    const reviews = useSelector(reviewActions.getReviews);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reviewActions.getSpotReviews(spot.id))
     //    console.log('IS IT ME UR LOOKING FOR ', spot.Owner)
     }, [spot, dispatch])

     const format = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        // console.log('month: ', months[date.slice(5,7)-1], 'year: ', date.slice(0,4))

        return months[date.slice(5,7)-1] + ' ' + date.slice(0,4)
    }

    // console.log('I HAVE HIT THE REVIEW COMP',reviews)

    // const user = useSelector(state => Object.values(state.session.user))[0]
    if(!user){
        const reviewItems = reviews.map((review) =>
        <li key={review.id} className="review-item">
        {console.log('I AM YOUR REVIEW',review)}
        <div id="li-review-container" data-testid='review-item'>
            <div id="review-image-container">
            {review.ReviewImages.map((image) =>
                <img src={review.ReviewImages[0]?.url} alt={image.id} key={image.id}/>
            )}
            </div>
            <div id="review-text" data-testid='review-text'>
                {/* <p>Posted by: {review.User.firstName}</p> */}
                <p>{review.review}</p>
                <br />
                <p data-testid='review-date'>{review.createdAt? format(review.createdAt.slice(0,10)) : ""}</p>
            </div>
        </div>
        </li>
    )
        return (
            <>
            {reviewItems}
            </>
        )
    }

    const {firstName, id, lastName} = user

    const info = {firstName, id, lastName}

    // console.log('IS IT ME UR LOOKING FOR ', owner.id, 'CONFIRM: ', info.id )

    // console.log('AM I THE OWNER?', info === owner) //false cant access owner consistently

    const reviewItems = reviews.map((review) =>
        <li key={review.id} className="review-item">
        {/* {console.log('I AM YOUR REVIEW',review.userId === info.id)} */}
        <div id="li-review-container" data-testid='review-item'>
            <div id="review-image-container">
            {review.ReviewImages.map((image) =>
                <img src={review.ReviewImages[0]?.url} alt={image.id} key={image.id}/>
            )}
            </div>
            <div id="review-text" data-testid='review-text'>
                {/* <p>Posted by: {review.User.firstName}</p> */}
                <p>{review.review}</p>
                <br />
                <p data-testid='review-date'>{review.createdAt? format(review.createdAt.slice(0,10)) : ""}</p>
                <br />
                {review.userId === info.id ?(
                <div className="delete-button">
                <OpenModalButton
                buttonText="Delete"
                className="delete-button"
                onButtonClick
                modalComponent={<DeleteReviewModal review={review}/>}
                />
                </div>
                ) : ("")}
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