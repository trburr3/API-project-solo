import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSpots } from "../../store/spots";
import * as spotActions from '../../store/spots';
import { Tooltip } from 'react-tooltip';

const ListSpots = () => {
    const dispatch = useDispatch();

    const spots = useSelector(getSpots);

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    const spotItems = spots.map((spot) =>
        <>
        <li key={spot.id}>
        <div className="li-spot-container" >
            <Link className={`link-comp-${spot.id}`}to={`/spots/${spot.id}`} >
                <Tooltip anchorSelect={`.link-comp-${spot.id}`} place="top">
                {spot.name}
                </Tooltip>
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
                    {spot.avgRating === "No rating yet." ? ("New") : (spot.avgRating)}
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