import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as spotActions from '../../store/spots';
import { GiCursedStar } from "react-icons/gi";
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal.jsx';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import './ManageSpot.css'

const ManageSpotItem = ({ spot }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    // thumbnail image, location, rating, price
    <li>
      <div className="li-spot-contents">
      <div className="li-spot-container">
        <Link to={`/spots/${spot.id}`}>{spot.name}
        <div className="li-spot-image">
        {/* <img src={spot.previewImage} alt={spot.name} /> */}
        <img
                src={"https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004049.jpg"}
                alt={spot.name} />
        </div>
        <div className="li-spot-description">
        <h2>{spot.address}, {spot.city}, {spot.state}, {spot.country}</h2>
        <h3>
        <GiCursedStar className='star-icon'/>
          {spot.avgRating === "No rating yet." ? ("New") : (spot.avgRating)}
          </h3>
        <h3>
        <span className="price">${spot.price}</span>/night
        </h3>
        </div>
        </Link>
      <div id="buttons-container">
        <button id="edit-link" onClick={() => navigate(`/spots/${spot.id}/edit`)}>

        Update

        </button>
          <div id='spot-delete-button'>
        <OpenModalButton
              buttonText="Delete"
              onButtonClick
              id="spot-delete-button"
              modalComponent={<DeleteSpotModal spot={spot} />}
            />
            </div>
      </div>
      </div>
      </div>
    </li>
  );
};

export default ManageSpotItem;