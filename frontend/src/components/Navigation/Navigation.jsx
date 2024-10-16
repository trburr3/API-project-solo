import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const user  = useSelector( (state) => state.session.user );

    return (
        <>
        <ul>
            <li>
                <NavLink to={'/'} >Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                <ProfileButton user={user} />
              </li>
            )}
        </ul>
        </>
    );
}

export default Navigation;