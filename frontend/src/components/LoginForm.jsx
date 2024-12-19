import { useState } from 'react';
import { useAuth} from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    //state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //context
    const { login } = useAuth();
    const navigate = useNavigate();

    //event handlers
    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        //here we will add the login logic
        //for example API call to login
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