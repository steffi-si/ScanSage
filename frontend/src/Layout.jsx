import { Outlet, Navigate } from "react-router-dom";
// import Header from "./views/Header.jsx";
import Footer from "./views/Footer.jsx";

function Layout() {

    return (
        <div className="layout">
            {/* <Header /> */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;