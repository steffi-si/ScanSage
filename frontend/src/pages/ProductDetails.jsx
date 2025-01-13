import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
// import { ProductCard } from "./ProductOverview";

function ProductDetails() {
  const navigate = useNavigate();
  const { productNumber } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${productNumber}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();

        setProductData(data.product);
      } catch (err) {
        setError("Error fetching product: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productNumber]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!productData) {
    return <p>Product not found</p>;
  }

  const handleScan = async (code) => {
    setScannedCode(code);
    setShowScanner(false);
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${code}/scan`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const data = await response.json();
        navigate(`/productdetail/${data.product.productNumber}`);
      } else {
        setError("Product not found");
      }
    } catch (error) {
      setError("Error scanning product: " + error.message);
    }
  };

  const handleEditBarcode = (productNumber) => {
    navigate(`/productdetail/${productNumber}/editbarcode`);
  };

  const handleEdit = async (productNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "reordered",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const data = await response.json();
      setProductData(data.updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="product-details-container">
        <ProductCard product={productData} onEditBarcode={() => {}} />
      </div>

      <div className="card product-details">
        <h2>Product Details</h2>
        <ul>
          <li>Product Number: {productData.productNumber}</li>
          <li>Name: {productData.name}</li>
          <li>Category: {productData.category}</li>
          <li>Status: {productData.status}</li>
          <li>Shelf : {productData.shelf}</li>
          <li>
            Prices:
            <ul className="nested-list">
              <li>
                Purchase Price: ${productData.price.purchasePrice ?? 'N/A'}
              </li>
              <li>
                Selling Price: ${productData.price.sellingPrice  ?? 'N/A'}
              </li>
              <li>
                Non-Binding Sales: $
                {productData.price.nonBindingSalesPrice ?? 'N/A'}
              </li>
            </ul>
          </li>
          <li>
            Express Dispatch: {productData.expressDispatch ? "Yes" : "No"}
          </li>
          <li>Available Colours: {productData.availableColours.join(" / ")}</li>
          <li>Fragile: {productData.fragile ? "Yes" : "No"}</li>
          <li>
            Filling Material:{" "}
            {productData.fillingMaterial.required ? "Required" : "Not Required"}
            , Amount: {productData.fillingMaterial.amount}
          </li>
          <li>Supplier Number: {productData.supplierNumber || "N/A"}</li>
          <li>
            Barcode:
            <ul className="nested-list">
              <li>Value: {productData.barcode.value}</li>
              <li>Format: {productData.barcode.format}</li>
              <li>
                Last Scanned:{" "}
                {productData.barcode.lastScanned
                  ? new Date(productData.barcode.lastScanned).toLocaleString()
                  : "N/A"}
              </li>
            </ul>
          </li>
          <li>
            Created At:{" "}
            {productData.createdAt
              ? new Date(productData.createdAt).toLocaleString()
              : "N/A"}
          </li>
          <li>
            Updated At:{" "}
            {productData.updatedAt
              ? new Date(productData.updatedAt).toLocaleString()
              : "N/A"}
          </li>
        </ul>
      </div>

      <div className="admin-controls">
        <button
          onClick={() => navigate(`/editproduct/${productData.productNumber}`)}
        >
          Edit Product
        </button>
        <button onClick={() => handleDeleteProduct(productData.productNumber)}>
          Delete Product
        </button>
        <button
          onClick={() =>
            navigate(`/productdetail/${productData.productNumber}/editbarcode`)
          }
        >
          Edit Barcode
        </button>
        <button onClick={() => navigate("/scan-barcode")}>
          Scan New Product
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, onEditBarcode }) {
  return (
    <div className="product-card">
      <h3>{product.name || "No name"}</h3>
      <p>Status: {product.status || "No status"}</p>
      <p>
        Price:{" "}
        {product.price.sellingPrice
          ? `$${product.price.sellingPrice}`
          : "Price not available"}
      </p>
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
      <Link to={`/product-detail/${product.productNumber}`}>
        Product Details
      </Link>
      <button onClick={() => onEditBarcode(product.productNumber)}>
        Edit Barcode
      </button>
    </div>
  );
}

export default ProductDetails;
