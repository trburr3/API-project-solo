import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './Reviews.css';

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
        <div id="li-review-container">
            <div id="review-image-container">
            {review.ReviewImages.map((image) =>
                <img src="https://cdn.pixabay.com/photo/2021/09/14/02/00/video-game-6622740_1280.png" alt={image.id} key={image.id}/>
            )}
            </div>
            <div id="review-text">
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
                <p>{review.createdAt}</p>
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