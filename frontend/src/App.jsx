import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
// import * as spotActions from './store/spots';
// import * as reviewActions from './store/reviews';
import ListSpots from './components/ListSpots/ListSpots';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateSpotsForm from './components/CreateSpotsForm/CreateSpotsForm';
import ManageSpots from './components/ManageSpot/ManageSpot';

function Layout() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true))
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      { isLoaded && <Outlet /> }
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ListSpots />
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetails />
      },
      {
        path:'spots/new',
        element: <CreateSpotsForm />
      },
      {
        path:'/current',
        element: <ManageSpots />
      }
      // {
      //   path: '/login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: '/signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

// const App = () => <RouterProvider router={router} />

export default App;
