import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as spotActions from '../../store/spots';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal.jsx';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const ManageSpotItem = ({ spot }) => {
  // const dispatch = useDispatch();

  return (
    // thumbnail image, location, rating, price
    <li>
      <div className="li-spot-contents">
        <Link to={`/spots/${spot.id}`}>Spot #{spot.id}: {spot.name}</Link>
        <img src={spot.previewImage} alt={spot.name} />
        <h2>Location: {spot.address}, {spot.city}, {spot.state}, {spot.country}</h2>
        <h3>{spot.avgRating}</h3>
        <h3>${spot.price}/night</h3>
      <div className="buttons-container">
        <Link
        className="edit-link"
        to={`/spots/${spot.id}/edit`}
        >
        Edit
        </Link>
        <OpenModalButton
              buttonText="Delete"
              onButtonClick
              modalComponent={<DeleteSpotModal spot={spot} />}
            />
      </div>
      </div>
    </li>
  );
};

export default ManageSpotItem;