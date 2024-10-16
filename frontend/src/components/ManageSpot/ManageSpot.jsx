import { Link } from 'react-router-dom';
import ManageSpotItem from './ManageSpotItem';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ManageSpots = () => {
  const dispatch = useDispatch();

  console.log('I AM IN THE COMP')

  const spots = useSelector(spotActions.getSpots);

  console.log('ALL SPOTS  ----> ', spots)

  const user = useSelector(state => state.session.user).user

  console.log('IS ANYONE HERE?', user.id)

  const userSpots = []

  spots.forEach((spot) => {
    if(spot.ownerId === user.id) userSpots.push(spot);
  })

  console.log('MY SPOTS ----> ', userSpots)

  useEffect(() => {
    // console.log('I AM CALLING THE THUNK')
    dispatch(spotActions.getAllSpots());
  }, [dispatch])

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {
        userSpots?
        (userSpots.map((spot) => (
          <ManageSpotItem
            spot={spot}
            key={spot.id}
          />
        ))) : (<Link to={'/spots/new'}>Create a New Spot</Link>)}
      </ul>
    </section>
  );
};

export default ManageSpots;