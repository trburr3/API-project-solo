import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSpots } from "../../store/spots";
import * as spotActions from '../../store/spots';
import { Tooltip } from 'react-tooltip';
import './ListSpots.css';

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
            <Link id={`link-comp-${spot.id}`}to={`/spots/${spot.id}`} >
            <Tooltip className='tooltip' anchorSelect={`#link-comp-${spot.id}`} place="top">
                {spot.name}
                </Tooltip>
            <div className="li-spot-image">
            <img
                src={"https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004049.jpg"}
                alt={spot.name} />
            </div>
            <div className="li-spot-description">
                <h2 className="item-1">
                    {spot.city}, {spot.state}
                </h2>
                <h3 className="item-2">
                    {spot.avgRating === "No rating yet." ? ("New") : (spot.avgRating)}
                </h3>
                <h4 className="item-3">
                    <span className="price">${spot.price}</span>/night
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
            <div className="spots-container">
                <ul className="spots">
                    {spotItems}
                </ul>
            </div>
        </>
    )
};

export default ListSpots;