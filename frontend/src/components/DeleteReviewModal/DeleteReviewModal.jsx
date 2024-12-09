// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ review }) => {

    // const [answer, setAnswer] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();

    // console.log(review)


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(review)

        return dispatch(reviewActions.deleteReview(review.id))
        .then(closeModal)
        .catch(async (res) => {
        const data = await res.json();
        if ( data ) {
            console.log(data)
        }
        });
    }
    return (
        <>
        <div className="delete-window">
        <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this review?</h3>
            <button type="Submit" className="button-yes" onClick={handleSubmit}>Yes (Delete Review)</button>
            <button type="Submit" className="button-no" onClick={closeModal}>No (Keep Review)</button>
        </div>
        </>
    )

};

export default DeleteReviewModal;