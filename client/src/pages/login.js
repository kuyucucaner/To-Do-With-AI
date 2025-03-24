import React , { useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { LoginUser} from '../redux/slices/user-slice';

const Login = () => {
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginUser({username: userName, password: password}));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            {user.isLoading && <p>Loading...</p>}
            {user.error && <p>{user.error}</p>}
        </div>
    )
};

export default Login;