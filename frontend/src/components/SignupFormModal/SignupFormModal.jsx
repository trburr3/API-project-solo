import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignUpForm.css';

const SignupFormModal = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    // (const user  =  useSelector(state => state.session.user))

    const dispatch = useDispatch();
    // const navigate = useNavigate();



    // console.log(user)

    // useEffect(() => {
    //      if(user) navigate('/')
    // }, [user, navigate]);

    // const reset = () => {
    //     setUsername('');
    //     setFirstName('');
    //     setLastName('');
    //     setEmail('');
    //     setPassword('');
    //     setConfirmPassword('');
        // setErrors({});
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(username.length < 4) {setErrors({ ...errors, username: 'Please provide a username with at least 4 characters.' });}

        // if(username.includes('@')) setErrors({ ...errors, username: 'Username cannot be an email.' });

        // if(password.length < 6) setErrors({ ...errors, password: 'Password must be 6 characters or more.' });

        if( password === confirmPassword ){
            setErrors({});

            const payload = {
                username,
                firstName,
                lastName,
                email,
                password
            };

            return dispatch(signUp(payload))
            .then(closeModal)
            .catch(async (res) => {
            // const data = await res.json();
            if ( res?.errors ) {
                setErrors(res.errors);
                console.log(errors)
            }
            });
        }

        return setErrors({ confirmPassword: 'Password fields do not match' });

        // console.log(errors)
    }

    return (
        <>
        <div className= "new-form-box">

        <form onSubmit={handleSubmit}>
        <h1 className="form-title">Signup Form</h1>
            {/* <div className="errors">{errors.statusText}</div> */}
            {/* <div className="errors">{errors.username}</div> */}
            <div className="input-large">
            <label>
            <span className="new-text">Username:</span>
                <input
                type="text"
                value={username}
                placeholder="Username"
                className="new-username"
                onChange={(e) => {setUsername(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.username && <p>{errors.username}</p>}
            <label>
                Email:
                <input
                type="email"
                value={email}
                placeholder="Email"
                className="email"
                onChange={(e) => {setEmail(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.email && <p>{errors.email}</p>}
            <label>
                First Name:
                <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="first-name"
                onChange={(e) => {setFirstName(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.firstName && <p>{errors.firstName}</p>}
            <label>
                Last Name:
                <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="last-name"
                onChange={(e) => {setLastName(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.lastName && <p>{errors.lastName}</p>}
            {/* <div className="errors">{errors.password}</div> */}
            <label>
                Password:
                <input
                type="password"
                value={password}
                placeholder="Password"
                className="new-password"
                onChange={(e) => {setPassword(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.password && <p>{errors.password}</p>}
            {/* <div className="errors">{errors.confirmPassword}</div> */}
            <label>
                Confirm Password:
                <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="confirm-password"
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                required />
            </label>
            </div>
            {errors.confirmPassword && ( <p>{errors.confirmPassword}</p> )}
            <button id="signup-button" type="Submit">Signup</button>
        </form>
        </div>
        </>
    )
};

export default SignupFormModal;