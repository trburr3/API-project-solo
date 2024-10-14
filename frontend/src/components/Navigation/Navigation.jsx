import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal'
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const user  = useSelector( (state) => state.session.user );

    // const Links = user ? (
    //     <>
    //         <li>
    //             <ProfileButton user={user} />
    //         </li>
    //     </>
    // ) : (
    //     <>
    //         <li>
    //             <OpenModalButton
    //             buttonText="Log In"
    //             modalComponent={<LoginFormModal />}
    //             />
    //         </li>
    //         <li>
    //             <OpenModalButton
    //             buttonText="Sign Up"
    //             modalComponent={<SignupFormModal />}
    //             />
    //         </li>
    //     </>
    // );

    return (
        <>
        <ul>
            <li>
                <NavLink to={'/'} >Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                <ProfileButton user={sessionUser} />
              </li>
            )}
        </ul>
        </>
    );
}

export default Navigation;