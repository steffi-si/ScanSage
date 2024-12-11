import {useAuth } from '../context/useAuthContext.jsx';


function Header() {
    const { isLoggedIn , logout } = useAuth();

    return (
        <header>
            <div className="logo-container">
                <img src="/images/Logowithslogan.png" alt="Logo" />
                <h1 className="slogan">Your Warehouse - Our Commitment</h1>
            </div>
            <nav>
                {isLoggedIn ? (
                    <>
                        <button onClick={logout}>Logout</button>
                        <a href="/">Back to Home</a>
                    </>
                ) : (
                    <p>Welcome! Please log in.</p>
                )}
            </nav>
        </header>
    )
}

export default Header;