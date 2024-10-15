import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from '../../store/spots';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";

const SpotDetails = () => {
    const dispatch = useDispatch();

    // const [test, setTest] = useState({});

    // console.log('HELLO FROM SPOT DETAILS')

    const { spotId } = useParams();

    // console.log('FROM PARAMS -->',spotId)

    const spot = useSelector(spotActions.getSpots)[spotId-1]
    const spotOwner = spot.Owner;

    // console.log('YOU FOUND ME --> ',test)

    useEffect(() => {
        dispatch(spotActions.singleSpot(spotId))
        // console.log('HI IM THE OWNER', spot.Owner)
    }, [dispatch, spotId]);

    // useEffect(() => {
    //     return (async () => {
    //         try {
    //              const spot = await dispatch(spotActions.singleSpot(spotId))
    //             return setTest(spot)
    //         } catch(e) {
    //             console.log('message:', e)
    //         }
    //     })
    // }, [dispatch, spotId]);
    return (
    <>
    <h1>{spot.name}</h1>
    <div className="spot-details-container">

            <img src={spot.previewImage} alt={spot.name} />
            <div className="spot-images">
                <img src="https://unsplash.com/photos/a-man-walking-down-a-dirt-road-in-the-woods-u4l1BUrNWZU" alt="placeholder"/>
                <img src="https://unsplash.com/photos/a-woman-reading-a-book-in-front-of-a-bookcase-_6lV0DA59uU" alt="placeholder" />
                <img src="https://unsplash.com/photos/a-cat-sitting-on-the-ground-in-front-of-a-blue-building-8oU3VWkHgL8" alt="placeholder" />
                <img src="https://unsplash.com/photos/a-person-holding-a-bunch-of-oranges-in-their-hands-qyFbjf1lNHM" alt="placeholder" />
                <img src="https://unsplash.com/photos/a-red-flower-sitting-on-top-of-a-white-sign-23MWvUzmUuE" alt="placeholder" />
            </div>
            <div className="spot-info">
                <h2>Hosted by: {spotOwner.firstName} {spotOwner.lastName}</h2>
                <h2>Hosted by: {spot.ownerId}</h2>
                <h2>Location: {spot.address}, {spot.city}, {spot.state}, {spot.country}</h2>
                <h3>{spot.description}</h3>
            </div>
            <div className="info-box">
                <h4>${spot.price}/night</h4>
                <button onClick={() => alert('Feature comming soon!')}>Reserve</button>
            </div>
            <div className="review-container">
                <ul>
                <Reviews spot={spot} />
                </ul>
            </div>
        </div>
    </>
    )
};

export default SpotDetails;