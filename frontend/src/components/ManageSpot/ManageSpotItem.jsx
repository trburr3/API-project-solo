import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as spotActions from '../../store/spots';
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
        <Link to={`/spots/${spot.id}`}>Spot #{spot.id}: {spot.name}</Link>
        <img src={spot.previewImage} alt={spot.name} />
        <h2>Location: {spot.address}, {spot.city}, {spot.state}, {spot.country}</h2>
        <h3>{spot.avgRating}</h3>
        <h3>${spot.price}/night</h3>
      <div id="buttons-container">
        <button id="edit-link" onClick={() => navigate(`/spots/${spot.id}/edit`)}>
        {/* <Link
        id="edit-link"
        to={`/spots/${spot.id}/edit`}
        > */}
        Edit
        {/* </Link> */}
        </button>
        <OpenModalButton
              buttonText="Delete"
              onButtonClick
              id="spot-delete-button"
              modalComponent={<DeleteSpotModal spot={spot} />}
            />
      </div>
      </div>
    </li>
  );
};

export default ManageSpotItem;