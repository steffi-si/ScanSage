import { createContext, useContext, useState , useEffect} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");

        if (token && userRole) {
            setIsLoggedIn(true);
            setRole(userRole);
        }
    }, []);

    function login(token, userRole) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsLoggedIn(true);
        setRole(userRole);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setIsLoggedIn(false);
        setIsAuthenticated(false);
        setRole(null);
    }

    // function isAuthenticated() {
    //     return localStorage.getItem("token") !== null;

    // }

    function getToken() {
        return localStorage.getItem("token");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout,isAuthenticated, role, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
};