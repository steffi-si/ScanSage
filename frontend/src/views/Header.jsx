import {useAuth } from '../context/useAuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


function Header() {
    const { isLoggedIn , logout } = useAuth();
    const navigate = useNavigate();  

    useEffect(() => {
        const handleBeforeUnload = () => {
            logout();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [logout]);

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
            <nav className="onclick-button">
                {isLoggedIn ? (
                    <>
                       <button className="feature-button"onClick={() => navigate("/features")}>Back to Features</button>
                       <button className="logout-button icon-only"onClick={handleLogout}> ◡ Logout</button>
                    
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