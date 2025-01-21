import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { BarcodeScanner } from "react-barcode-scanner";
import 'react-barcode-scanner/polyfill';
// import {BarcodeReader, BarcodeGenerator} from '../components/BarcodeReader';

function ProductOverview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("allproducts");
  const [statusFilter, setStatusFilter] = useState("");
  const [showOrderView, setShowOrderView] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [randomBarcode, setRandomBarcode] = useState("generate");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, statusFilter, scannedCode]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:3000/api/products";
      const params = new URLSearchParams();
      if (categoryFilter && categoryFilter !== "allproducts") {
        params.append("category", categoryFilter);
      }
      if (statusFilter) {
        params.append("status", statusFilter);
        
      }
      if (params.toString()) {
        url += "?" +  params.toString();
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      if (scannedCode && data.products.length === 1) {
        navigate(`/productdetail/${data.products[0].productNumber}`);
      }
    } catch (error) {
      setError(`Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateNewProductWithBarcode = async () => {
    try {
      const newBarcode = Date.now().toString();
     
      const response = await fetch("http://localhost:3000/api/products/with-barcode", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, data.product]);
    } catch (error) {
      setError("Error creating new product: " + error.message);
    }
  };

  const handleScan = async (code) => {
    setScannedCode(code);
    setShowScanner(false);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${code}/scan`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/productdetail/${data.product.productNumber}`);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      setError('Error scanning product: ' + error.message);
    }
  };

  const handleEditBarcode = (productNumber) => {
    navigate(`/productdetail/${productNumber}/editbarcode`);
  };

  return (
    <div className="product-overview">
      <div className="toolbar">
        <button onClick={() => setShowOrderView(!showOrderView)}>
          {showOrderView ? 'Close Orderview' : 'Open Orderview'}
           
        </button>

         {showOrderView && <OrderOverview />}

        <button onClick={generateNewProductWithBarcode}> New Product with Barcode</button>
        {showScanner && <BarcodeScanner onDetected={handleScan} />}
        <FilterComponent
          onFilterChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />
      </div>
      <div className="product-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : !Array.isArray(products) ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.productNumber || product._id}
              product={product}
              onEditBarcode={handleEditBarcode}
            />
          ))
        )}
      </div>
      {/* <button onClick={() => navigate("/features")}>Back to Features</button> */}
    </div>
  );
}

export  function ProductCard({ product, onEditBarcode }) {
 
  return (
    <div className="product-card">
      <h3>{product.name || "No name"}</h3>
      <p>Status: {product.status || "No status"}</p>
      <p>Price: {
        product.price?.sellingPrice?.value 
          ? `${product.price.sellingPrice.value.toFixed(2)} ${product.price.sellingPrice.currency}`
          : "Price not available"
      }</p>
      {product.barcode && (
        <div className="barcode-container">
          <Barcode
            value={product.barcode.value}
            format={product.barcode.format}
            width={1}
            height={100}
            displayValue={true}
            font="bold 8px Arial"
            textAlign="center"
            textPosition="bottom"
            textMargin={2}
            fontSize={20}
            background="#ffffff"
            lineColor="#000000"
            margin={10}
          />
        </div>
      )}
      <Link to={`/product-detail/${product.productNumber}`} className="product-link">Product Details</Link>
    </div>
  );
}

function FilterComponent({ onFilterChange, onStatusChange }) {
  return (
    <div className="filter-component">
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="allproducts">All Products</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
        <option value="Electronic">Electronics</option>
        <option value="Appliances">Appliances</option>
        <option value="Sports">Sports</option>
        <option value="Furniture">Furniture</option>
      </select>
      <select onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All</option>
        <option value="in_stock">In Stock</option>
        <option value="almost_sold_out">Almost Sold Out</option>
        <option value="reordered">Reordered</option>
        <option value="packing_station">Packing Station</option>
        <option value="in_delivery">In Delivery</option>
      </select>
    </div>
  );
}

function OrderOverview() {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  useEffect(() => {
    fetchOrderedProducts();
  }, []);

  const fetchOrderedProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrderedProducts(data.orders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === "new") {
      setSelected(null);
      //setShowScanner(true);
    } else {
      //setShowScanner(false);
    }
  };

  const handleShowBarcode = (product) => {
    setSelectedProduct(product);
    setShowBarcodeModal(true);
  };



  return(
    <div className="order-overview">
      <h2>Order Overview</h2>
      <select 
        value={orderType} 
        onChange={(e) => handleOrderTypeChange(e.target.value)}
      >
        <option value="existingProduct">Existing Products</option>
        <option value="newProduct">New Products</option>
      </select>

      {/* {showScanner && <BarcodeScanner onScan={handleScan} />} */}

      <div className="product-list">
        {orderedProducts.map(product => (
          <div key={product.id} className="product-item">
            <p>{product.name}</p>
            <button onClick={() => handleShowBarcode(product)}>Show Barcode</button>
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
  )
}



export default ProductOverview;
