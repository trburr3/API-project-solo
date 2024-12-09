import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';
import StarRatingInput from "../StarInput/StarInput";
import './ReviewFormModal.css';

const ReviewFormModal = ({ spot }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [disabled, setDisabled] = useState(true);

    // const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();

    //  const reset = () => {
    //     setReview('');
    //     setStars(0);
    // }

    const onChange = (num) => {
        // const number = e.target.value;
        setStars(parseInt(num));
      };

    useEffect(() => {
        if(review.length > 10 && stars > 0) setDisabled(false);
    }, [review, disabled, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors({});

        const payload = {
            review,
            stars
        };

        console.log(payload)

        return dispatch(reviewActions.createReview(payload, spot.id))
        .then(closeModal)
        .catch(async (res) => {
        const data = await res.json();
        if ( data ) {
            // setErrors(data.errors);
            console.log(data)
        }
        });
    }
    return (
        <>
        <div id='review-box'>
        <div className="title-text">
        <h1>How was your stay?</h1>
        </div>
        <form onSubmit={handleSubmit}>
            {/* <div className="errors">{errors.statusText}</div> */}
            {/* <div className="errors">{errors.username}</div> */}
            <div className="review-text">
            <label>
                {/* Review: */}
                <textarea
                type="text"
                value={review}
                placeholder="Leave your review here..."
                id="desc-text"
                className="review-text"
                onChange={(e) => {setReview(e.target.value)}}
                required />
            </label>
            </div>
            {/* {errors.username && <p>{errors.username}</p>} */}
            <div className="stars-input">
            <label>

                {/* <input
                type="number"
                value={stars}
                placeholder="Email"
                onChange={(e) => {setStars(e.target.value)}}
                 /> */}
                <StarRatingInput
                disabled={false}
                onChange={onChange}
                id='stars'
                rating={stars}
                 />
                 {/* Stars */}
            </label>
            </div>
            {/* {errors.email && <p>{errors.email}</p>} */}
            <div className='button-box'>
            <button type="Submit" disabled={disabled} id='review-button' className={disabled ? 'off' : 'on'}>Submit Your Review</button>
            </div>
        </form>
        </div>
        </>
    )

};

export default ReviewFormModal;