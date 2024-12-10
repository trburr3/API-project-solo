import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSpots } from "../../store/spots";
import * as spotActions from '../../store/spots';
import { Tooltip } from 'react-tooltip';
import { GiCursedStar } from "react-icons/gi";
import './ListSpots.css';

const ListSpots = () => {
    const dispatch = useDispatch();

    const spots = useSelector(getSpots);
    // console.log(spots)

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    const spotItems = spots.map((spot) =>
        <>
        <li key={spot.id}>
        <div className="li-spot-container" data-testid='spot-tile'>
            <Link id={`link-comp-${spot.id}`}to={`/spots/${spot.id}`} data-testid='spot-link' >
            <Tooltip className='tooltip' anchorSelect={`#link-comp-${spot.id}`} place="top" data-testid='spot-tooltip'>
                <span data-testid='spot-name'>{spot.name}</span>
                </Tooltip>
            <div className="li-spot-image" data-testid='spot-thumbnail-image'>
            <img
                src={spot.previewImage}
                alt={spot.name} />
            </div>
            <div className="li-spot-description">
                <h2 className="item-1" data-testid='spot-city'>
                    {spot.city}, {spot.state}
                </h2>
                <h3 className="item-2" data-testid='spot-rating'>
                    <GiCursedStar className='star-icon'/>
                    {spot.avgRating === "No rating yet." ? ("New") : (spot.avgRating)}
                </h3>
                <h4 className="item-3" data-testid>
                    <span className="price" data-testid='spot-price'>${spot.price}</span>/night
                </h4>
                {/* <p>
                    {spot.description}
                </p> */}
            </div>
            </Link>
        </div>
        </li>
        </>
        );
    return (
        <>
        {/* <h1>All Spots</h1> */}
            <div className="spots-container" data-testid='spots-list'>
                <ul className="spots">
                    {spotItems}
                </ul>
            </div>
        </>
    )
};

export default ListSpots;