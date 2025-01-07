import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Header from '../views/Header.jsx';
import Footer from "../views/Footer.jsx";
import { BarcodeScanner } from "react-barcode-scanner";
import { Barcode } from "react-barcode";

function ProductOverview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("allproducts");
  const [statusFilter, setStatusFilter] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //fetch request to get products
    const fetchProducts = async () => {
      try {
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
        if(scannedCode) {
          params.append("productNumber", scannedCode);
        }
        const response = await fetch(url);
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setProducts(data.products);
        if(scannedCode && data.products.length === 1) {
          navigate(`/productdetail/${data.products[0].productNumber}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); //set loading to false
      }
    };

    fetchProducts();
  }, [categoryFilter, statusFilter, scannedCode, navigate]);


  return (
    <div className="product-overview">
      <div className="toolbar">
        <button className="scan-button" onClick={()=> 
          setShowScanner(!showScanner)}
        >
          <div icon="📱">Scan</div>
        </button>
        <FilterComponent
          onFilterChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />
      </div>
      {showScanner && <BarcodeReader onScan={(code)=> {
        setScannedCode(code);
        setShowScanner(false);
      }} onError={(err)=> {
        console.error(err);
      }}/>}
      <div className="product-container">
        <div className="product-overview">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : !Array.isArray(products) ? (
            <p>Products is not an array</p>
          ) : products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.productNumber || product._id}
                product={product}
              />
            ))
          )}
        </div>
        <div>
          <button className="back-button" onClick={() => navigate("/features")}>Back to FeaturesPage</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard({ product }) {
  // console.log("Product data:", product);
  return (
    <div className="product-card">
      {/* {product.image && <img src={product.image} alt={product.name} />} */}
      <h3>{product.name || "No name"}</h3>
      <p>Product Number: {product.productNumber || "No number"}</p>
      <p>Status: {product.status || "No status"}</p>
      <p>
        Price:{" "}
        {product.price.sellingPrice
          ? `$${product.price.sellingPrice}`
          : "Price not available"}
      </p>
      <Link
        to={`/productdetail/${product.productNumber}`}
        className="details-button"
      >
        Product Details
      </Link>
    </div>
  );
}

function FilterComponent({ onFilterChange, onStatusChange }) {
  return (
    <div className="filter-component">
      <label htmlFor="filter">Filter:</label>
      <select id="filter" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="allproducts">All Products</option>
        <option value="category1">Categorie 1</option>
        <option value="status">Status</option>
        {/* More filter function... */}
      </select>
      <label htmlFor="status">Status:</label>
      <select
        id="status-filter"
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="instock">In Stock</option>
        <option value="almostsoldout">Almost Sold Out</option>
        <option value="reordered">Reordered</option>
        <option value="packingstation">Packing Station</option>
        <option value="indelivery">In Delivery</option>
      </select>
    </div>
  );
}

function BarcodeReader({onScan, onError}) {
  return(
    <div className="barcode-scanner">
    <BarcodeScanner
      onUpdate={(err, result) => {
        if (result) {
          onScan(result.text);
        }
        if (err) {
          onError(err);
        }
      }}
      />
    </div>
  )
}

export default ProductOverview;
