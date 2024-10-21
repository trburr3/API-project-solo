import { useNavigate } from 'react-router-dom';
import ManageSpotItem from './ManageSpotItem';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ManageSpot.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('I AM CALLING THE THUNK')
    dispatch(spotActions.getAllSpots());
  }, [dispatch])

  // console.log('I AM IN THE COMP')

  const spots = useSelector(spotActions.getSpots);

  // console.log('ALL SPOTS  ----> ', spots)

  const user = useSelector(state => state.session.user)

  // console.log('IS ANYONE HERE?', user.id)

  const userSpots = []

  spots.forEach((spot) => {
    if(spot.ownerId === user.id) userSpots.push(spot);
  })

  // console.log('MY SPOTS ----> ', userSpots)

  return (
    <div className='manage'>
      <h1>Manage Spots</h1>
      <button onClick={() => navigate('spots/new')} className='menu-button-1 manage-create'>Create a New Spot</button>
      <div className='spots-container'>
      <ul className='spots'>
        {
        userSpots?
        (userSpots.map((spot) => (
          <ManageSpotItem
            spot={spot}
            key={spot.id}
          />
        ))) : ("")}
      </ul>
      </div>
    </div>
  );
};

export default ManageSpots;