import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";

const LoginFormModal = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate

    const { closeModal } = useModal();

    const user  =  useSelector(state => state.session.user) //am i being used?

    const dispatch = useDispatch();

    useEffect(() => {
        if(credential.length > 4) setDisabled(false);
        if(password.length > 6) setDisabled(false);
    }, [credential, password, disabled])

    // if ( user ) navigate('/');

    // console.log(user)

    // useEffect(() => {}, [dispatch]);

    // const reset = () => {
    //     setCredential('');
    //     setPassword('');
    //     // setErrors({});
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const credentials = {
            credential: credential,
            password: password
        };

        return dispatch(login(credentials))
            .then(closeModal)
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
            });

        // try {
        //     const user = await dispatch(login(credentials))
        //     reset()
        //     navigate('/')
        // } catch(e) {
        //     // console.log(e);
        //     setErrors(e);
        // }
    }

    return (
        <>
        <div className= "form-box">
        <form onSubmit={handleSubmit}>
            <h1 className="form-title">Login Form</h1>
            <div className="errors">{errors.statusText}</div>
            {/* <div className="errors">{errors.username || errors.email}</div> */}
            <div className="input">
            <label>
            <span className="text">Username or Email:</span>
                <input
                type="text"
                value={credential}
                placeholder="Username or Email"
                className="username"
                onChange={(e) => {setCredential(e.target.value)}}
                required />
            </label>
            </div>
            {/* <div className="errors">{errors.password}</div> */}
            {errors.credential && ( <p>{errors.credential}</p> )}
            <div  className="input">
            <label>
                <span className="text">Password:</span>
                <input
                type="password"
                value={password}
                placeholder="Password"
                className="password"
                onChange={(e) => {setPassword(e.target.value)}}
                required />
            </label>
            </div>
            <button id="login-button" type="Submit">Login</button>
        </form>
        </div>
        </>
    )
};

export default LoginFormModal;