
import { Link } from "react-router-dom";

const IndexItem = ({ spot }) => {

    return (
        <li key={spot.id}>
        <div className="li-spot-container">
            <Link to={`/spots/${spot.id}`} >{spot.name}
            <img src={spot.previewImage} alt={spot.name} />
            <div className="li-spot-description">
                <h2>{spot.city}, {spot.state}</h2>
                <h3>{spot.avgRating}</h3>
                <h4>{spot.price}/night</h4>
                <p>{spot.description}</p>
            </div>
            </Link>
        </div>
        </li>
    )
};

export default IndexItem;