import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { GiStoneBlock } from "react-icons/gi";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const user  = useSelector( (state) => state.session.user );

    return (
        <>
        {/* <ul> */}
            {/* <li> */}
        <div className="header">
            <div className="left">
                <NavLink to={'/'} >
                <GiStoneBlock className="logo" />
                    BlockBnB
                    </NavLink>
            </div>
            {/* </li> */}
            {isLoaded && (
                <div className="right">
                {/* <li> */}

                <ProfileButton className="profile-button" user={user} />
              {/* </li> */}
               </div>
            )}
        </div>
        {/* </ul> */}
        </>
    );
}

export default Navigation;