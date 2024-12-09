import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

    const [disabled, setDisabled] = useState(true);

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    // (const user  =  useSelector(state => state.session.user))

    const dispatch = useDispatch();
    // const navigate = useNavigate();



    // console.log(user)

    // useEffect(() => {
    //      if(user) navigate('/')
    // }, [user, navigate]);

    useEffect(() => {
        if(username && username.length > 4 && firstName && lastName && email && password && password.length > 6 && confirmPassword) setDisabled(false)
   }, [username, firstName, lastName, email, password, confirmPassword]);

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

        if(username.length < 4) {setErrors({ ...errors, username: 'Please provide a username with at least 4 characters.' });}

        if(username.includes('@')) setErrors({ ...errors, username: 'Username cannot be an email.' });

        if(password.length < 6) setErrors({ ...errors, password: 'Password must be 6 characters or more.' });

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
            const data = await res.json();
            if ( data ) {
                setErrors({data})
                console.log('here is the problem: ', errors.data)
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
            {/* <div className="errors"   data-testid='email-error-message'>{errors.data.errors.username}</div> */}
            <div className="input-large">
            <label>
            <span className="new-text">Username:</span>
                <input
                type="text"
                value={username}
                placeholder="Username"
                className="new-username"
                data-testid='username-input'
                onChange={(e) => {setUsername(e.target.value)}}
                required />
            </label>
            </div>
            {/* <div className="errors"   data-testid='email-error-message'>{errors.data.errors.email}</div> */}
            <div className="input-large">
            {errors.data && <p className="errors" >{errors.data.errors.username}</p>}
            <label>
                Email:
                <input
                type="email"
                value={email}
                placeholder="Email"
                className="email"
                data-testid='email-input'
                onChange={(e) => {setEmail(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.data && <p className="errors" >{errors.data.errors.email}</p>}
            <label>
                First Name:
                <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="first-name"
                data-testid='first-name-input'
                onChange={(e) => {setFirstName(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {/* {errors.firstName && <p>{errors.firstName}</p>} */}
            <label>
                Last Name:
                <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="last-name"
                data-testid='last-name-input'
                onChange={(e) => {setLastName(e.target.value)}}
                required />
            </label>
            </div>
            {/* <div className="errors"   data-testid='email-error-message'>{errors.data.errors.password}</div> */}
            <div className="input-large">
            {errors.data && <p className="errors" >{errors.data.errors.password}</p>}
            {/* {errors.lastName && <p>{errors.lastName}</p>} */}
            {/* <div className="errors">{errors.password}</div> */}
            <label>
                Password:
                <input
                type="password"
                value={password}
                placeholder="Password"
                className="new-password"
                data-testid='password-input'
                onChange={(e) => {setPassword(e.target.value)}}
                required />
            </label>
            </div>
            <div className="input-large">
            {errors.password && <p>{errors.password}</p>}
            <div className="errors" data-testid='username-error-message'>{errors.confirmPassword}</div>
            <label>
                Confirm Password:
                <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="confirm-password"
                data-testid='confirm-password-input'
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                required />
            </label>
            </div>
            {/* {errors.confirmPassword && ( <p>{errors.confirmPassword}</p> )} */}
            <button id="signup-button" type="Submit" data-testid='form-sign-up-button' disabled={disabled}>Signup</button>
        </form>
        </div>
        </>
    )
};

export default SignupFormModal;