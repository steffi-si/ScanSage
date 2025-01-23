import React, { useState, useEffect } from "react";
import BarcodeScanner from "../components/BarcodeScanner";


function OrderOverview() {
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [almostSoldOutProducts, setAlmostSoldOutProducts] = useState([]);
    const [showScanner, setShowScanner] = useState(false);
    const [orderType, setOrderType] = useState("existingProduct");
    const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  
    useEffect(() => {
      // fetchOrderedProducts();
      fetchAlmostSoldOutProducts();
    }, []);
  
    // const fetchOrderedProducts = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/api/orders");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch orders");
    //     }
    //     const data = await response.json();
    //     setOrderedProducts(data.orders);
    //   } catch (error) {
    //     console.error("Error fetching orders: ", error);
    //   }
    // };
  
    const fetchAlmostSoldOutProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/products/almost_sold_out"
        );
  
        if (!response.ok) {
          throw new Error(
            `Failed to fetch almost sold out products: ${response.status} ${response.statusText}`
          );
        }
  
        const data = await response.json();
        setAlmostSoldOutProducts(data);
      } catch (error) {
        console.error("Error fetching almost sold out products:", error);
        // Handle the error (e.g., display an error message to the user)
        setError("Failed to fetch almost sold out products.");
      }
    };
  
    const handleOrderTypeChange = (type) => {
      setOrderType(type);
      if (type === "new") {
        setSelected(null);
        setShowScanner(true);
      } else {
        setShowScanner(false);
      }
    };
  
    const handleShowBarcode = (product) => {
      setSelectedProduct(product);
      setShowBarcodeModal(true);
    };
  
    return (
      <div className="order-overview">
        <h2>Order Overview</h2>
        <select
          value={orderType}
          onChange={(e) => handleOrderTypeChange(e.target.value)}
        >
          <option value="newProduct">New Products</option>
          <option value="almostSoldOut">Almost Sold Out Products</option>
        </select>
  
        {showScanner && <BarcodeScanner onScan={handleScan} />}
  
        <div className="product-list">
          {orderType === "newProduct" &&
            orderedProducts.map((product) => (
              <div key={product.id} className="product-item">
                <p>{product.name}</p>
                <p>Status: {product.status}</p>
                <button onClick={() => handleShowBarcode(product)}>
                  Show Barcode
                </button>
              </div>
            ))}
  
          {orderType === "almostSoldOut" &&
            almostSoldOutProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} className="product-item">
                <p>{product.name}</p>
                <p>Status: {product.status}</p>
                <button onClick={() => handleShowBarcode(product)}>
                  Show Barcode
                </button>
              </div>
            ))}
        </div>
  
        {showBarcodeModal && selectedProduct && (
          <div className="barcode-modal">
            <Barcode value={selectedProduct.ean} />
            <button onClick={() => setShowBarcodeModal(false)}>Close</button>
          </div>
        )}
      </div>
    );
}

export default OrderOverview;