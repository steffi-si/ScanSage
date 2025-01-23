import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuthContext";

function Delivery() {
  const { getToken } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/api/deliveries?page=${page}&limit=${limit}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        const data = await response.json();
        setDeliveries(data.deliveries);
        setTotalCount(data.totalCount);
      } catch (error) {
        setError(`Error fetching deliveries: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, [page, limit, getToken]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="deliveries-list">
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.trackingNumber} delivery={delivery} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalCount / limit)}
        onPageChange={handlePageChange}
      />
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

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Delivery;

// Warehouse...
// function Warehoue() {
//     const { getToken } = 
// 