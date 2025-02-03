import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';


function Dashboard() {
  const [warehouseSummary, setWarehouseSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouseSummary = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/warehouses/capacity/summary');
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht in Ordnung');
        }
        const data = await response.json();
        setWarehouseSummary(data.capacitySummary);
        setLoading(false);
      } catch (err) {
        setError('Fehler beim Abrufen der Lagerdaten');
        setLoading(false);
      }
    };

    fetchWarehouseSummary();
  }, []);



  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="warehouse-dashboard">
      <h2 className="section-title">Warehouse Capacity Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={warehouseSummary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="warehouseName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="currentLoad" fill="#8884d8" name="Current Load" />
          <Bar dataKey="availableCapacity" fill="#82ca9d" name="Available Capacity" />
        </BarChart>
      </ResponsiveContainer>
      <div className="summary-cards">
        {warehouseSummary.map(warehouse => (
          <div key={warehouse.warehouseName} className="warehouse-card">
            <h3>{warehouse.warehouseName}</h3>
            <p>Total Capacity: {warehouse.totalCapacity}</p>
            <p>Currentload: {warehouse.currentLoad}</p>
            <p>Available Capacity: {warehouse.availableCapacity}</p>
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