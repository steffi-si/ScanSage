import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import BarcodeScanner from "../components/BarcodeScanner";
import ProductCard from "../components/ProductCard";
import "react-barcode-scanner/polyfill";
// import BarcodeReader from '../components/BarcodeReader';

function ProductOverview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("allproducts");
  const [statusFilter, setStatusFilter] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  // const [randomBarcode, setRandomBarcode] = useState("generate");
  const [isScanningNewProduct, setIsScanningNewProduct] = useState(false);
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
        url += "?" + params.toString();
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

  const generateNewProductWithBarcode = async (scannedBarcode) => {
    try {
      setLoading(true);
      const newProductData = {
        barcode: {
          value: scannedBarcode ,
          format: "CODE128",
          lastScanned: new Date(),
        },
        name: "New Product",
        productNumber: Date.now().toString(),
      };

      const response = await fetch(
        "http://localhost:3000/api/products/with-barcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProductData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data.product]);
      setError(null);
    } catch (error) {
      setError("Error creating new product: " + error.message);
    }
    setLoading(false);
    setIsScanningNewProduct(false);
  };

  const handleScan = async (code) => {
    setScannedCode(code);
    setShowScanner(false);
    setLoading(true);

    try {
      if (isScanningNewProduct) {
        await generateNewProductWithBarcode(code);
        const response = await fetch(
          `http://localhost:3000/api/products/${code}/scan`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          navigate(`/productdetail/${data.product.productNumber}`);
        } else {
          if (
            confirm("Product not found. Do you want to create a new product?")
          ) {
            setIsScanningNewProduct(true);
            await generateNewProductWithBarcode(code);
          } else {
            setError("Product not found");
          }
        }
      }
    } catch (error) {
      setError("Error scanning product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBarcode = (productNumber) => {
    navigate(`/productdetail/${productNumber}/editbarcode`);
  };

  return (
    <div className="product-overview">
      <h2>Product Overview</h2>
      <div className="toolbar">

        <button onClick={() => setShowScanner(true)}>
          Scan Product
        </button>
        {showScanner && (
          <BarcodeScanner onDetected={handleScan} onClose={() => setShowScanner(false) } /> 
        )}
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



export default ProductOverview;
