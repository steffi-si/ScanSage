import { useState } from 'react';
import { useAuth} from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    //state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //context
    const { login } = useAuth();
    const navigate = useNavigate();

    //event handlers
    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        //here we will add the login logic
        //for example API call to login
        if(!username || !password) {
            setError('Please enter username and password');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            login(data.token, data.user.role);
            navigate('/features');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    }

    //     //for now we will just check if username and password are admin
    //     if (username === 'admin' && password === 'admin') {
    //         setError('');
    //         login();  //calling login function from context
    //         alert('Login successful');
    //     } else {
    //         setError('Invalid username or password');
    //     }

    //     login(token, userRole);
    //     navigate('/dashboard');
    // }

    return(
        <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    aria-required="true"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    aria-required="true"
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Login started...' : 'Login'}
            </button>
        </form>
        {error && <div className="error-message" role="alert">{error}</div>}
    </div>
    );
}

export default LoginForm;