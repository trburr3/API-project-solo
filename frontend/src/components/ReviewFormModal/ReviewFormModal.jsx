import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';
import StarRatingInput from "../StarInput/StarInput";

const ReviewFormModal = ({ spot }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [disabled, setDisabled] = useState(true);

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();

     const reset = () => {
        setReview('');
        setStars(0);
    }

    const onChange = (num) => {
        // const number = e.target.value;
        setStars(parseInt(num));
      };

    useEffect(() => {
        if(review.length > 10) setDisabled(false);
    }, [review, disabled])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const payload = {
            review,
            stars
        };

        console.log(payload)

        return dispatch(reviewActions.createReview(payload, spot.id))
        .then(closeModal)
        .catch(async (res) => {
        const data = await res.json();
        if ( data?.errors ) {
            setErrors(data.errors);
        }
        });
    }
    return (
        <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
            {/* <div className="errors">{errors.statusText}</div> */}
            {/* <div className="errors">{errors.username}</div> */}
            <label>
                Review:
                <textarea
                type="text"
                value={review}
                placeholder="Leave your review here..."
                onChange={(e) => {setReview(e.target.value)}}
                required />
            </label>
            {errors.username && <p>{errors.username}</p>}
            <label>
                Stars:
                <input
                type="number"
                value={stars}
                placeholder="Email"
                onChange={(e) => {setStars(e.target.value)}}
                 />
                <StarRatingInput
                disabled={false}
                onChange={onChange}
                rating={stars}
                 />
            </label>
            {errors.email && <p>{errors.email}</p>}


            <button type="Submit" disabled={disabled}>Submit Your Review</button>
        </form>
        </>
    )

};

export default ReviewFormModal;