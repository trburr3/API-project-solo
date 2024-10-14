import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../context/Modal";
import './LoginForm.css';

const LoginFormModal = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();

    const user  =  useSelector(state => state.session.user)

    const dispatch = useDispatch();

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
        <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div className="errors">{errors.statusText}</div>
            {/* <div className="errors">{errors.username || errors.email}</div> */}
            <label>
                Username:
                <input
                type="text"
                value={credential}
                onChange={(e) => {setCredential(e.target.value)}}
                required />
            </label>
            {/* <div className="errors">{errors.password}</div> */}
            {errors.credential && ( <p>{errors.credential}</p> )}
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required />
            </label>
            <button type="Submit">Login</button>
        </form>
        </>
    )
};

export default LoginFormModal;