import { createContext, useContext, useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authIsLoading, setAuthIsLoading] = useState(true);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                const userRole = localStorage.getItem("role");

                if (token && userRole) {
                    setIsLoggedIn(true);
                    setRole(userRole);
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Error reading from localStorage:", error);
                logout();
            } finally {
                setAuthIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    async function login(token, userRole) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsLoggedIn(true);
        setRole(userRole);
        setAuthIsLoading(false);
    }

    async function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setRole(null);
        setAuthIsLoading(false);
        navigate("/");
    }

    function getToken() {
        return localStorage.getItem("token");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, role, getToken , authIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}; 