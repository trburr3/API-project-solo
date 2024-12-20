import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbBrandMinecraft } from "react-icons/tb";
import { FiMenu } from "react-icons/fi";
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

const ProfileButton = ( { user } ) => {
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggle = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if(!showMenu) return ;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
              setShowMenu(false);
            }
          };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const Logout = (e) => {
      e.preventDefault();
      dispatch(logout());
      closeMenu();
      navigate('/')
    };

    const New = (e) => {
      e.preventDefault();
      navigate('/spots/new')
    };

    const Edit = (e) => {
      e.preventDefault();
      navigate('/current')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

    return (
    <>
      {/* <div style={{ color: "orange", fontSize: "100px" }}> */}
      {user ? (
        <button onClick={New} id='new' className="menu-button-2 create-nav" data-testid='create-new-spot-button'>Create a New Spot</button>
      ) : ("")}
      <button onClick={toggle} className='menu-button' data-testid='user-menu-button'>
      <FiMenu className="menu"/>
        <TbBrandMinecraft className='menu-symbol' />
      {/* </div> */}
      </button>
      <ul className={ulClassName} hidden={!showMenu} ref={ulRef} data-testid='user-dropdown-menu'>
      { user ? (
          <>
            <li className='text-item'>{user.username}</li>
            <li className='text-item'>Hello, {user.firstName}</li>
            <li className='text-item'>{user.email}</li>
            <li>
              <button onClick={Logout} className="menu-button-1">Log Out</button>
            </li>
          </>
        ) : (
          <>

            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              className="menu-button-1"
              data-testid='login-modal'
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              className="menu-button-2"
              data-testid='sign-up-form'
              modalComponent={<SignupFormModal />}
            />

          </>
        )}
         { user ? (
            <>
            {/* <li>
            <button onClick={New} className="menu-button-2">Create a New Spot</button>
            </li> */}
            <li>
            <button onClick={Edit} className="menu-button-3">Manage Spots</button>
            </li>
            </>
        ) : ("") }
      </ul>
    </>
    );
  };

  export default ProfileButton