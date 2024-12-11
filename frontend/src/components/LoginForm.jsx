import { useState } from 'react';
import { useAuth} from '../context/useAuthContext';


function LoginForm() {
    //state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //context
    const { login } = useAuth();

    //event handlers
    function handleLogin(e) {
        e.preventDefault();
        //here we will add the login logic
        //for example API call to login

        //for now we will just check if username and password are admin
        if (username === 'admin' && password === 'admin') {
            setError('');
            login();  //calling login function from context
            alert('Login successful');
        } else {
            setError('Invalid username or password');
        }
    }

    return(
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                    <p className="signup">Don’t have an account? <a href="/signup" >Sign up</a></p>
                </div>
            </form>
            <div>
                {error}
            </div>
        </div>
    );
}

export default LoginForm;