import { useState } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute.jsx";
import Header from "./views/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { AuthProvider } from "./context/useAuthContext.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import Delivery from "./pages/Delivery.jsx";
import ProductOverview from "./pages/ProductOverview.jsx";
import UserMgtOverview from "./pages/UserMgtOverview.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Layout from "./Layout.jsx";
import Popup from "./views/Popup.jsx";
import Footer from "./views/Footer.jsx";

function App() {
  const [popupMessage, setPopupMessage] = useState('');
 

  return (
    <>
      <AuthProvider>
        <Header />
        {popupMessage && (
          <Popup message={popupMessage} closePopup={() => setPopupMessage('')} />
        )}
        {/* Public Route*/}
        <Routes>
          <Route path="/" element={<LoginForm />} />

         {/* Private Route*/}
         <Route element={<Layout />}>
          <Route 
            path="/features" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin', 'supervisor']}>
                <FeaturesPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/product-overview" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin', 'supervisor']}>
                <ProductOverview />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/product-detail/:productNumber" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin', 'supervisor']}>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route 
            path="/delivery" 
            element={
              <PrivateRoute allowedRoles={['user', 'manager', 'admin', 'supervisor']}>
                <Delivery />
              </PrivateRoute>
            }
          />
          <Route 
            path="/user-management" 
            element={
              <PrivateRoute allowedRoles={['admin', 'manager']}>
                <UserMgtOverview />
              </PrivateRoute>
            }
          />
        </Route>


        {/* Fallback Route*/}
          <Route path="*" element={<Navigate to="/"  replace/>} />
        </Routes>
        <Footer />
      </AuthProvider>
    
    </>
  );
}

export default App;
