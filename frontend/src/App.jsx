import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./views/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { AuthProvider } from "./context/useAuthContext.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
// import ProductOverview from "./pages/ProductOverview.jsx";
import Footer from "./views/Footer.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <LoginForm />
        {/* <ProductOverview /> */}
        {/* <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes> */}
        <FeaturesPage />
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
