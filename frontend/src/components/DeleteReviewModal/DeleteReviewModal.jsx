import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import * as reviewActions from '../../store/reviews';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ review }) => {

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(reviewActions.deleteReview(review.id))
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
        <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this review?</h3>
            <button type="Submit" className="button-yes" onSubmit={handleSubmit}>Yes (Delete Review)</button>
            <button type="Submit" className="button-no" onSubmit={closeModal}>No (Keep Review)</button>
        </>
    )

};

export default DeleteReviewModal;