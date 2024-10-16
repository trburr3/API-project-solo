import { FaCarrot } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenModalMenuItem from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

const ProfileButton = ( { user }) => {
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
            if (ulRef.current && !ulRef.current.contains(e.target)) {
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
    };

    const New = (e) => {
      e.preventDefault();
      navigate('/spots/new')
    }

    const Edit = (e) => {
      e.preventDefault();
      navigate('/current')
    }

    return (
    <>
      {/* <div style={{ color: "orange", fontSize: "100px" }}> */}
      <button onClick={toggle}>
        <FaCarrot />
      {/* </div> */}
      </button>
      <ul className={"profile-dropdown" + ( showMenu ? "" : "hidden" )} ref={ulRef}>
      { user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={Logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      { user ? (
        <>
        <button onClick={New}>Create a New Spot</button>
        <button onClick={Edit}>Manage Spots</button>
        </>
      ) : ("") }
    </>
    );
  };

  export default ProfileButton