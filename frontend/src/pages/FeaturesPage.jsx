import { Link, useNavigate } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useAuth } from '../context/useAuthContext.jsx';
import Footer from '../views/Footer.jsx';


function FeaturesPage() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    } , [isLoggedIn, navigate]);


    


    return (
        <div className="features-page">
            <h2>FeaturesPage</h2>
            <div className="feature-container">
                <FeatureCard title="Products" icon="📦" link="/product-overview" />
                <FeatureCard title="Dashboard" icon="📊" link="/dashboard" />
                <FeatureCard title="Delivery" icon="🚚" link="/delivery-details" />
            
                <FeatureCard title="User Management" icon="👤" link="/user-management" />
               
                <FeatureCard title="Statistics" icon="📈" link="/statistics" />
            </div>
            <Footer />
        </div>
    ); 
}

function FeatureCard({ title, icon , link }) {
    return (
    <Link to={link} className="feature-card"> {/* Link  */}
        <div className="feature-content">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
        </div>
    </Link>
    );
}

export default FeaturesPage;