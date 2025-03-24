import React , { useState } from 'react' ; 
import { useDispatch , useSelector}  from 'react-redux';
import { RegisterUser } from '../redux/slices/user-slice'

const Register = () => {

    const [ userName , setUserName] = useState("");
    const [ password , setPassword ] = useState("");
    const dispatch = useDispatch();
    const {error , loading } = useSelector((state) => state.user);

    const handleRegister = async(e) => {
        e.preventDefault();
        dispatch(RegisterUser({userName, password}));
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Choose an username' value={userName } onChange={(e) => setUserName(e.target.value)} />
                <input type="password" placeholder='Enter a password' value={password } onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' disabled={loading}>Register</button>

                {error && <p>{error.message}</p>}
            </form>
        </div>
    );

};

export default Register;