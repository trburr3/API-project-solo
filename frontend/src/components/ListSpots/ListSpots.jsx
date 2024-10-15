import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSpots } from "../../store/spots";
import * as spotActions from '../../store/spots';
// import IndexItem from "./IndexItem";

const ListSpots = () => {
    const dispatch = useDispatch();

    const spots = useSelector(getSpots);

    // const spotsList = useSelector(state => state.spots)

    // console.log('\n\n ARE WE HERE YET? \n\n', spots[0])

    // console.log('IN THE LIST COMP')

    useEffect(() => {
        'THUNK DISPATCHED'
        dispatch(spotActions.getAllSpots());
        // console.log(spots)
    }, [dispatch]);

    const spotItems = spots.map((spot, index) =>
        <>
    {/* { console.log('AM I BEING MAPPED OVER',spot.id)} */}
        <li key={index}>
        <div className="li-spot-container" >
            <Link to={`/spots/${spot.id}`} >
                {spot.name}
            <div className="li-spot-image">
            <img
                src={spot.previewImage}
                alt={spot.name} />
            </div>
            <div className="li-spot-description">
                <h2>
                    {spot.city}, {spot.state}
                </h2>
                <h3>
                    {spot.avgRating}
                </h3>
                <h4>
                    ${spot.price}/night
                </h4>
                <p>
                    {spot.description}
                </p>
            </div>
            </Link>
        </div>
        </li>
        </>
        );
    return (
        <>
        <h1>All Spots</h1>
            <div className="spots-container">
                <ul>
                    {spotItems}
                </ul>
            </div>
        </>
    )
};

export default ListSpots;