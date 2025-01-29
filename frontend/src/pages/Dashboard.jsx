import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


function Dashboard() {
  const [warehouseSummary, setWarehouseSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarehouseSummary();
  }, []);

  const fetchWarehouseSummary = async () => {
    try {
      const response = await fetch('http://localhost:3000/warehouse/capacity/summary');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWarehouseSummary(data.capacitySummary);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch warehouse data');
      setLoading(false);
    }
  };

  const chartData = {
    labels: warehouseSummary.map(w => w.warehouseName),
    datasets: [
      {
        label: 'Current Load',
        data: warehouseSummary.map(w => w.currentLoad),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Available Capacity',
        data: warehouseSummary.map(w => w.availableCapacity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="warehouse-dashboard">
      <h2>Warehouse Capacity Overview</h2>
      <div className="chart-container">
        <Bar data={chartData} options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Capacity'
              }
            }
          }
        }} />
      </div>
      <div className="summary-cards">
        {warehouseSummary.map(warehouse => (
          <div key={warehouse.warehouseName} className="warehouse-card">
            <h3>{warehouse.warehouseName}</h3>
            <p>Total Capacity: {warehouse.totalCapacity}</p>
            <p>Current Load: {warehouse.currentLoad}</p>
            <p>Available: {warehouse.availableCapacity}</p>
            <div className="capacity-bar">
              <div 
                className="capacity-fill" 
                style={{width: `${(warehouse.currentLoad / warehouse.totalCapacity) * 100}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;