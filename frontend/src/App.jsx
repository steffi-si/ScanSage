import { useState } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import Header from "./views/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { AuthProvider, useAuth } from "./context/useAuthContext.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import ProductOverview from "./pages/ProductOverview.jsx";
import UserMgtOverview from "./pages/UserMgtOverview.jsx";
import Layout from "./Layout.jsx"
import Footer from "./views/Footer.jsx";

function App() {
  {/*PrivateRoute componente*/}
  const PrivateRoute = ({ children, allowedRoles }) => {
    const {isLoggedIn, role } = useAuth();

    if(!isLoggedIn) {
      return <Navigate to="/" />;
    }

    if(allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/app" />;
    }

    return children;
  }

  return (
    <>
      <AuthProvider>
        <Header />
        {/* <UserMgtOverview /> */}
        {/* Public Route*/}
        <Routes>
          <Route path="/" element={<LoginForm />} />

         {/* Private Route*/}
         <Route element={<Layout />}>
          <Route 
            path="/features" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin']}>
                <FeaturesPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/product-overview" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin']}>
                <ProductOverview />
              </PrivateRoute>
            } 
          />
        </Route>


        {/* Fallback Route*/}
          <Route path="*" element={<Navigate to="/"  replace/>} />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
