import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GiCursedStar } from "react-icons/gi";
import * as spotActions from '../../store/spots';
import Reviews from "../Reviews/Reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();

    // const [isValid, setIsValid] = useState(false);

    const { spotId } = useParams();

    useEffect(() => {
        dispatch(spotActions.singleSpot(spotId))
        // console.log('HI IM THE OWNER', spot.Owner)
    }, [dispatch, spotId]);

    // console.log('HELLO FROM SPOT DETAILS')

    const user  = useSelector( (state) => state.session.user );

    const spot = useSelector(spotActions.getSpots)[spotId-1];

    const spots = useSelector(spotActions.getSpots)

    console.log('LOOK AT ME: ',spots.length)
    // console.log(spot)

   if(spot){

    // const spot = useSelector(spotActions.getSpots)[0];

    const spotOwner = spot.Owner;


    // console.log('HAVE I LOADED --> ',spotOwner);

    // if ( user && user.id !== spotOwner?.id) setIsValid(true);

    return (
        // <h1>HELLO WORLDDD</h1>
    <>
    <div id="spots-page" data-testid='spot-tile'>
    <div id="spot-title" data-testid>
    <h1 data-testid='spot-name'>{spot?.name}</h1>
    <h2 data-testid='spot-location'>Location: {spot?.address}, <span data-testid='spot-city'>{spot?.city}</span>, {spot?.state}, {spot?.country}</h2>
    </div>
    <div id="spot-details-container">
            <div id="pictures">
            <img id="preview" src={spot.previewImage ? spot.previewImage : spot.SpotImages[0].url} alt={spot?.name}  data-testid='spot-large-image'/>
            <div id="spot-images" data-testid='spot-small-image'>
                {/* <div> */}
                <img id="image1" src={spot.SpotImages? spot.SpotImages[1]?.url : spot.previewImage} alt={spot?.name}/>
                {/* </div> */}
                <img id="image2" src={spot.SpotImages? spot.SpotImages[2]?.url : spot.previewImage} alt={spot?.name} />
                {/* <div> */}
                <img id="image3" src={spot.SpotImages? spot.SpotImages[3]?.url : spot.previewImage} alt={spot?.name}  />
               {/* </div> */}
                <img id="image4" src={spot.SpotImages? spot.SpotImages[4]?.url : spot.previewImage} alt={spot?.name}  />
                {/* <div>
                <img id="image5" src="https://img.freepik.com/free-photo/big-country-house-winter_23-2147803910.jpg?ga=GA1.1.6487007.1729119067&semt=ais_hybrid" alt="placeholder" />
                </div> */}
            </div>
            </div>
            <div id="spot-info">
                <div className="spot-text" data-testid='spot-host'>
                { spotOwner ?
                (<h2>Hosted by: {spotOwner?.firstName} {spotOwner?.lastName}</h2>) :
                (<h2>Hosted by: {spot?.ownerId}</h2>)
                }
                {/* <h2>Hosted by: {spot?.ownerId}</h2> */}
                <h3 data-testid='spot-description'>{spot?.description}</h3>
                </div>
                <div id="info-box" data-testid='spot-callout-box'>
                <h4 data-testid='spot-price'>${spot?.price}/night</h4>
                <h4 data-testid='spot-rating'>{spot?.avgRating}</h4>
                <button id="reserve" onClick={() => alert('Feature comming soon!')} data-testid='reserve-button'>Reserve</button>
            </div>
            </div>

            <div id="review-container" data-testid='reviews-heading'>
                <ul>
                    <div className="review-avg" >
                    <li>
                    <GiCursedStar className='review-star-icon'/>
                    {spot.avgStarRating
                    === "No rating yet." ? ("New") : (spot.avgStarRating
                    )}
                    </li>
                    <li className="center-dot">·</li>
                    <li data-testid='review-count'>
                    {spot.numReviews? spot.numReviews : "Be the first to post a review"} {spot.numReviews > 1 ? ("Reviews") : ("Review")}
                    </li>
                    </div>
                <div data-testid='review-list'><Reviews spot={spot} owner={spotOwner} user={user} /></div>
                </ul>
            </div>
            {user && user.id !== spotOwner?.id ? (
                    <div id="review-modal">
                    <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewFormModal spot={spot}/>}
                    onButtonClick
                    onModalClose
                    />
                    </div>
                ) : ("")}
        </div>
        {/* <img id="test" src="https://cdn.pixabay.com/photo/2022/06/02/15/07/golden-sword-7238266_1280.png" alt="tester" /> */}
        </div>
    </>
    )

}

return (
    <h1>NO SPOT FOUND</h1>
)






};

export default SpotDetails;