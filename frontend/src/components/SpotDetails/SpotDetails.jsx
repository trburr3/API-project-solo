import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as spotActions from '../../store/spots';
import Reviews from "../Reviews/Reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";

const SpotDetails = () => {
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);

    const { spotId } = useParams();

    useEffect(() => {
        dispatch(spotActions.singleSpot(spotId))
        // console.log('HI IM THE OWNER', spot.Owner)
    }, [dispatch, spotId]);

    // console.log('HELLO FROM SPOT DETAILS')

    const user  = useSelector( (state) => state.session.user );

    const spot = useSelector(spotActions.getSpots)[0];

    // const spots = useSelector(spotActions.getSpots)

    // console.log(spots)

   if(spot){

    // const spot = useSelector(spotActions.getSpots)[0];

    const spotOwner = spot.Owner;

    // console.log('HAVE I LOADED --> ',spotOwner);

    // if ( user && user.id !== spotOwner?.id) setIsValid(true);

    return (
        // <h1>HELLO WORLDDD</h1>
    <>
    <h1>{spot?.name}</h1>
    <h2>Location: {spot?.address}, {spot?.city}, {spot?.state}, {spot?.country}</h2>
    <div className="spot-details-container">

            <img src="https://img.freepik.com/free-photo/3d-render-house-countryside_1048-13116.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt={spot.name} />
            <div className="spot-images">
                <img className="image1" src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder"/>
                <img src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder" />
                <img src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder" />
                <img src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder" />
                <img src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder" />
            </div>
            <div className="spot-info">
                {/* { spotOwner ?
                (<h2>Hosted by: {spotOwner?.firstName} {spotOwner?.lastName}</h2>) :
                (<h2>Hosted by: {spot?.ownerId}</h2>)
                } */}
                <h2>Hosted by: {spot?.ownerId}</h2>
                <h3>{spot?.description}</h3>
            </div>
            <div className="info-box">
                <h4>${spot?.price}/night</h4>
                <h4>{spot?.avgRating}</h4>
                <button className="reserve" onClick={() => alert('Feature comming soon!')}>Reserve</button>
            </div>
            <div className="review-container">
                {user && isValid ? (
                    <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewFormModal spot={spot}/>}
                    onButtonClick
                    onModalClose
                    />
                ) : ("")}
                <ul>
                <Reviews spot={spot} owner user={user} />
                </ul>
            </div>
        </div>
    </>
    )

}

return (
    <h1>NO SPOT FOUND</h1>
)






};

export default SpotDetails;