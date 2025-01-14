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
    <div className="main-content">
      <div className="product-details-container">
        <ProductCard product={productData} onEditBarcode={() => {}} />
      </div>

      <div className="product-details-container card">
        <h2>Product Details</h2>
        <ul>
          <li>
            <strong>Name:</strong> {productData.name}
          </li>
          <li>
            <strong>Category:</strong> {productData.category}
          </li>
          <li>
            <strong>Prices:</strong>
            <ul className="nested-list">
              <li>
                Purchase Price:{" "}
                {productData.price?.purchasePrice?.value?.toFixed(2) ?? "N/A"}{" "}
                {productData.price?.purchasePrice?.currency}
              </li>
              <li>
                Selling Price:{" "}
                {productData.price?.sellingPrice?.value?.toFixed(2) ?? "N/A"}{" "}
                {productData.price?.sellingPrice?.currency}
              </li>
              <li>
                Non-Binding Sales Price:{" "}
                {productData.price?.nonBindingSalesPrice?.value?.toFixed(2) ??
                  "N/A"}{" "}
                {productData.price?.nonBindingSalesPrice?.currency}
              </li>
            </ul>
          </li>
          <li>
            <strong>Express Dispatch:</strong>{" "}
            {productData.expressDispatch ? "Yes" : "No"}
          </li>
          <li>
            <strong>Available Colours:</strong>{" "}
            {productData.availableColours?.join(", ") ?? "N/A"}
          </li>
          <li>
            <strong>Fragile:</strong> {productData.fragile ? "Yes" : "No"}
          </li>
          <li>
            <strong>Packaging Size:</strong>{" "}
            {productData.packagingSize?.join(" x ") ?? "N/A"} cm
          </li>
          <li>
            <strong>Filling Material:</strong>{" "}
            {productData.fillingMaterial?.required
              ? "Required"
              : "Not Required"}
            , Amount: {productData.fillingMaterial?.amount}
          </li>
          <li>
            <strong>Shelf:</strong> {productData.shelf}
          </li>
          <li>
            <strong>Supplier Number:</strong>{" "}
            {productData.supplierNumber ?? "N/A"}
          </li>
          <li>
            <strong>Status:</strong> {productData.status}
          </li>
          <li>
            <strong>Barcode:</strong>
            <ul className="nested-list">
              <li>Value: {productData.barcode?.value ?? "N/A"}</li>
              <li>Format: {productData.barcode?.format}</li>
              <li>
                Last Scanned:{" "}
                {productData.barcode?.lastScanned
                  ? new Date(productData.barcode.lastScanned).toLocaleString()
                  : "N/A"}
              </li>
            </ul>
          </li>
          <li>
            <strong>Description:</strong>
            <ul className="nested-list">
              <li>Manufacturer: {productData.description?.manufacturer}</li>
              <li>
                Long Description: {productData.description?.longDescription}
              </li>
              <li>
                Materials:{" "}
                {productData.description?.materials?.join(", ") ?? "N/A"}
              </li>
              <li>
                Weight: {productData.description?.weight?.value}{" "}
                {productData.description?.weight?.unit}
              </li>
              <li>
                Custom Attributes:
                <ul className="nested-list">
                  {productData.description?.customAttributes?.map(
                    (attr, index) => (
                      <li key={index}>
                        {attr.key}:{" "}
                        {Array.isArray(attr.value)
                          ? attr.value.join(", ")
                          : attr.value}
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div className="admin-controls">
          <button
            onClick={() =>
              navigate(`/editproduct/${productData.productNumber}`)
            }
          >
            Edit Product
          </button>
          <button
            onClick={() => handleDeleteProduct(productData.productNumber)}
          >
            Delete Product
          </button>
          <button onClick={() => navigate("/scan-barcode")}>
            Scan New Product
          </button>
        </div>
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
        {product.price?.sellingPrice?.value
          ? `${product.price.sellingPrice.value.toFixed(2)} ${
              product.price.sellingPrice.currency
            }`
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
      {/* <button onClick={() => onEditBarcode(product.productNumber)}>
        Edit Barcode
      </button> */}
    </div>
  );
}

export default ProductDetails;
