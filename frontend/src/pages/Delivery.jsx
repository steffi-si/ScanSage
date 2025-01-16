import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuthContext";

function Delivery() {
  const { getToken } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/deliveries");
        if (!response.ok) {
          throw new Error("Failed to fetch delivery");
        }
        const data = await response.json();
        setDeliveries(data.deliveries);
      } catch (error) {
        setError(`Error fetching deliveries: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div className="deliveries-list">
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.trackingNumber} delivery={delivery} />
      ))}
    </div>
  );
}

function DeliveryCard({ delivery }) {
  return (
    <div className="delivery-card">
      <h3>Tracking Number: {delivery.trackingNumber}</h3>
      <p>
        <strong>Delivery Date:</strong>{" "}
        {new Date(delivery.deliveryDate).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {delivery.status}
      </p>
      <p>
        <strong>Total Price:</strong> {delivery.totalPrice.toFixed(2)} €
      </p>
      <p>
        <strong>Total Weight:</strong> {delivery.totalWeight} kg
      </p>
      <p>
        <strong>Delivery Address:</strong> {delivery.deliveryAddress},{" "}
        {delivery.deliveryCity}, {delivery.deliveryPostcode},{" "}
        {delivery.deliveryCountry}
      </p>
      <Link to={`/delivery/${delivery.trackingNumber}`}>View Details</Link>
    </div>
  );
}

export default Delivery;