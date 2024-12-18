import { Outlet, Navigate } from "react-router-dom";
import Header from "./views/Header.jsx";
import Footer from "./views/Footer.jsx";
import { useAuth } from "./context/useAuthContext.jsx";

function Layout() {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;