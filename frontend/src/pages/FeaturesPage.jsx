import { Link } from 'react-router-dom';
import Header from '../views/Header.jsx';
import Footer from '../views/Footer.jsx';

function FeaturesPage() {
    return (
        <div className="features-page">
           <h2>FeaturesPage</h2>
            <div className="feature-container">
                <FeatureCard title="Product Overview" icon="📦" link="/product-overview" />
                <FeatureCard title="Dashboard" icon="📊" link="/dashboard" />
                <FeatureCard title="Delivery Details" icon="🚚" link="/delivery-details" />
                <FeatureCard title="User Management Overview" icon="👤" link="/user-management" />
                <FeatureCard title="Statistiken" icon="📈" link="/statistics" />
            </div>
            <Footer />
        </div>
    ); 
}

function FeatureCard({ title, imgSrc , icon , link}) {
    return (
        <div className="feature-card">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <Link to={link} className="button">Go to {title}</Link>
        </div>
    );
}

export default FeaturesPage;