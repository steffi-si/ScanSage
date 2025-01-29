import { Link, useNavigate } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useAuth } from '../context/useAuthContext.jsx';
import Popup from '../views/Popup.jsx';



function FeaturesPage() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    } , [isLoggedIn, navigate]);


    return (
        <div className="features-page">
            <h2>FeaturesPage</h2>
            <div className="feature-container">
                <FeatureCard title="Products" icon="📦" link="/product-overview" allowedRoles={['user', 'manager', 'admin', 'supervisor']}  setPopupMessage={setPopupMessage} setShowPopup={setShowPopup} />
                <FeatureCard title="Dashboard" icon="🏭" link="/dashboard" allowedRoles={[ 'admin', 'supervisor']}  setPopupMessage={setPopupMessage} setShowPopup={setShowPopup}/>
                <FeatureCard title="Delivery" icon="🚚" link="/delivery" allowedRoles={['user', 'admin', 'supervisor']}   setPopupMessage={setPopupMessage} setShowPopup={setShowPopup}/>
            
                <FeatureCard title="User Management" icon="👤" link="/user-management"  allowedRoles={[ 'manager', 'admin', 'supervisor']}  setPopupMessage={setPopupMessage} setShowPopup={setShowPopup}/>
               
                <FeatureCard title="Statistics" icon="📈" link="/statistics"  allowedRoles={[ 'manager', 'admin', 'supervisor']} setPopupMessage={setPopupMessage} setShowPopup={setShowPopup} />
            </div>
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
    ); 
}


function FeatureCard({ title, icon , link , allowedRoles, setPopupMessage, setShowPopup}) {
    const { role } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if(allowedRoles.includes(role)) {
            navigate(link);
        } else {
            setPopupMessage('You are not allowed to access this page');
            setShowPopup(true);
        }
    };

    return (
    <Link to={link} className="feature-card" onClick={handleClick}> {/* Link  */}
        <div className="feature-content">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
        </div>
    </Link>
    );
}

export default FeaturesPage;