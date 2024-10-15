import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as reviewActions from '../../store/reviews';

const Reviews = ({ spot }) => {
    const reviews = useSelector(reviewActions.getReviews);

    console.log('I HAVE HIT THE REVIEW COMP',reviews)

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(reviewActions.getSpotReviews(spot.id))
    //    console.log('IS IT ME UR LOOKING FOR ', spot.Owner)
    }, [spot, dispatch])

    const reviewItems = reviews.map((review) =>
        <li key={review.id}>
        <div className="li-review-container">
            <div className="review-image-container">
            {review.ReviewImages.map((image) =>
                <img src={image.url} alt={image.id} />
            )}
            </div>
            <div className="li-review-text">
                <p>Posted by: {review.User.firstName}</p>
                <p>{review.review}</p>
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