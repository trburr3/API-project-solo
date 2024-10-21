import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spots';
import './DeleteSpotModal.css'

// Clicking "Delete" on one of the spot tiles on the spot management page opens a
// confirmation modal popup that should contain: a Title: "Confirm Delete",
// a Message: "Are you sure you want to remove this spot?",
// a Red button: "Yes (Delete Spot)", and a Dark grey button: "No (Keep Spot)".

const DeleteSpotModal = ({ spot }) => {

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(spotActions.deleteSpot(spot.id))
        .then(() => closeModal)
        .catch(async (res) => {
        // const data = await res.json();
        if ( res?.errors ) {
            setErrors(res.errors);
        }
        });
    }
    return (
        <>
        <div id="delete-window">
        <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot?</h3>
            <button type="Submit" className="button-yes" onClick={handleSubmit}>Yes (Delete Spot)</button>
            <button type="Submit" className="button-no" onClick={closeModal}>No (Keep Spot)</button>
        </div>
        </>
    )

};

export default DeleteSpotModal;