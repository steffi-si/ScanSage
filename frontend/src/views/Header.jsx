import {useAuth } from '../context/useAuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Header() {
    //
    const { isLoggedIn , logout } = useAuth();
    const navigate = useNavigate();  //useNavigate is a hook that returns a navigate function

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <header>
            <div className="logo-container">
                <img src="/images/Logowithslogan.png" alt="Logo" />
                <h1 className="slogan">Your Warehouse - Our Commitment</h1>
            </div>
            <nav>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <a href="/">Back to Home</a>
                    </>
                ) : (
                    <>
                        <Link to="/login"></Link>
                        <p>Welcome! Please log in.</p>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;