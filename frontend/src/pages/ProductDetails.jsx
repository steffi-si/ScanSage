import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuthContext";
import Barcode from "react-barcode";
import ProductCard from "../components/ProductCard";
import '../styles/Productdetails.css';
import '../styles/Productoverview.css';


function ProductDetails() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { productNumber } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const isSupervisor = role === "supervisor";

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
        setError("Error fetching product: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productNumber]);

  const handleInputChange = (key, value) => {
    setEditedProduct({
      ...editedProduct,
      [key]: value,
    });
  };

  const handleEditBarcode = (productNumber) => {
    navigate(`/productdetail/${productNumber}/editbarcode`);
  };

  const handleEditProduct = async () => {
    if (!isSupervisor) {
      alert("You are not allowed to reorder products");
      return;
    }
    setIsEditing(true);
    setEditedProduct({
      ...productData,
      fillingMaterial: {
        ...productData.fillingMaterial,
        required: productData.fillingMaterial?.required || false,
        amount: productData.fillingMaterial?.amount || 0,
      },
      description: {
        ...productData.description,
        weight: {
          ...productData.description?.weight,
          value: productData.description?.weight?.value || 0,
        },
        manufacturer: productData.description?.manufacturer || "",
        longDescription: productData.description?.longDescription || [],
        materials: productData.description?.materials || [],
      },
    });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to edit products");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedProduct),
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          alert("Access denied.");
        } else {
          throw new Error("Failed to update product");
        }
      }
      const data = await response.json();
      setProductData(data.updatedProduct);
      setIsEditing(false);
      setEditedProduct(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update product: " + error.message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!isSupervisor) {
      alert("You are not allowed to delete products");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/products/${productNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      alert("Product deleted successfully");
      navigate("/product-overview");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!productData) {
    return <p>Product not found</p>;
  }

  return (
    <div className="main-content">
      <div className="product-details-container">
        <ProductCard product={productData} onEditBarcode={() => {}} />
      </div>

      <div
        className={`product-details-container card ${
          isEditing ? "editing-mode" : ""
        }`}
      >
        <h2 className="section-title">Product Details</h2>
        <ul>
          <li>
            <strong>Name:</strong>
            {isEditing ? (
              <input
                value={productData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              productData.name
            )}
          </li>
          <li>
            <strong>Category:</strong>
            {isEditing ? (
              <input
                value={productData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              />
            ) : (
              productData.category
            )}
          </li>
          <li>
            <strong>Prices:</strong>
            <ul className="nested-list">
              <li>
                Purchase Price:{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProduct?.price?.purchasePrice?.value || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: {
                          ...editedProduct?.price,
                          purchasePrice: {
                            ...editedProduct?.price?.purchasePrice,
                            value: parseFloat(e.target.value),
                          },
                        },
                      })
                    }
                  />
                ) : (
                  productData.price?.purchasePrice?.value?.toFixed(2) ?? "N/A"
                )}{" "}
                {productData.price?.purchasePrice?.currency}
              </li>
              <li>
                Selling Price:{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProduct.price?.sellingPrice?.value || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: {
                          ...editedProduct.price,
                          sellingPrice: {
                            ...editedProduct.price?.sellingPrice,
                            value: parseFloat(e.target.value),
                          },
                        },
                      })
                    }
                  />
                ) : (
                  productData.price?.sellingPrice?.value?.toFixed(2) ?? "N/A"
                )}{" "}
                {productData.price?.sellingPrice?.currency}
              </li>
              <li>
                Non-Binding Sales Price:{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={
                      editedProduct.price?.nonBindingSalesPrice?.value || ""
                    }
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: {
                          ...editedProduct.price,
                          nonBindingSalesPrice: {
                            ...editedProduct.price?.nonBindingSalesPrice,
                            value: parseFloat(e.target.value),
                          },
                        },
                      })
                    }
                  />
                ) : (
                  productData.price?.nonBindingSalesPrice?.value?.toFixed(2) ??
                  "N/A"
                )}{" "}
                {productData.price?.nonBindingSalesPrice?.currency}
              </li>
            </ul>
          </li>
          <li>
            <strong>Express Dispatch:</strong>{" "}
            {isEditing ? (
              <select
                value={editedProduct.expressDispatch ? "Yes" : "No"}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    expressDispatch: e.target.value === "Yes",
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : productData.expressDispatch ? (
              "Yes"
            ) : (
              "No"
            )}
          </li>
          <li>
            <strong>Available Colours:</strong>{" "}
            {isEditing ? (
              <input
                value={editedProduct.availableColours?.join(", ") ?? ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    availableColours: e.target.value.split(","),
                  })
                }
              />
            ) : (
              productData.availableColours?.join(", ") ?? "N/A"
            )}
          </li>
          <li>
            <strong>Fragile:</strong>
            {isEditing ? (
              <select
                value={editedProduct.fragile ? "Yes" : "No"}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    fragile: e.target.value === "Yes",
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : productData.fragile ? (
              "Yes"
            ) : (
              "No"
            )}
          </li>
          <li>
            <strong>Packaging Size:</strong>{" "}
            {isEditing ? (
              <input
                value={
                  Array.isArray(productData.packagingSize)
                    ? productData.packagingSize?.join("x") ?? ""
                    : "N/A"
                }
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    packagingSize: e.target.value.split(" x "),
                  })
                }
              />
            ) : (
              productData.packagingSize?.join(" x ") ?? "N/A"
            )}{" "}
            cm
          </li>
          <li>
            <strong>Filling Material:</strong>{" "}
            {isEditing ? (
              <>
                Required:
                <select
                  value={
                    editedProduct.fillingMaterial?.required
                      ? "Required"
                      : "Not Required"
                  }
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      fillingMaterial: {
                        ...editedProduct.fillingMaterial,
                        required: e.target.value === "Required",
                      },
                    })
                  }
                >
                  <option value="Required">Required</option>
                  <option value="Not Required">Not Required</option>
                </select>
                , Amount:
                <input
                  type="number"
                  value={editedProduct.fillingMaterial?.amount || ""}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      fillingMaterial: {
                        ...editedProduct.fillingMaterial,
                        amount: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </>
            ) : (
              <>
                {productData.fillingMaterial.required
                  ? "Required"
                  : "Not Required"}
                , Amount: {productData.fillingMaterial.amount}
              </>
            )}
          </li>
          <li>
            <strong>Shelf:</strong>
            {isEditing ? (
              <input
                value={editedProduct.shelf || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    shelf: e.target.value,
                  })
                }
              />
            ) : (
              productData.shelf || "N/A"
            )}
          </li>
          <li>
            <strong>Supplier Number:</strong>{" "}
            {isEditing ? (
              <input
                value={editedProduct.supplierNumber || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    supplierNumber: e.target.value,
                  })
                }
              />
            ) : (
              productData.supplierNumber ?? "N/A"
            )}
          </li>
          <li>
            <strong>Status:</strong>
            {isEditing ? (
              <select
                value={editedProduct.status}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    status: e.target.value,
                  })
                }
              >
                <option value="in_stock">In Stock</option>
                <option value="almost_sold_out">Almost Sold Out</option>
                <option value="reordered">Reordered</option>
                <option value="packing_station">Packing Station</option>
                <option value="in_delivery">In Delivery</option>
              </select>
            ) : (
              productData.status
            )}
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
              <li>
                <strong>Manufacturer:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct.description?.manufacturer || ""}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: {
                          ...editedProduct.description,
                          manufacturer: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  productData.description?.manufacturer || "N/A"
                )}
              </li>
              <li>
                <strong>Long Description:</strong>
                {isEditing ? (
                  <textarea
                    value={
                      editedProduct.description?.longDescription ||
                      ""
                    }
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: {
                          ...editedProduct.description,
                          longDescription: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  productData.description?.longDescription || "N/A"
                )}
              </li>
              <li>
                <strong>Materials:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={
                      editedProduct.description?.materials?.join(", ") || ""
                    }
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: {
                          ...editedProduct.description,
                          materials: e.target.value.split(", "),
                        },
                      })
                    }
                  />
                ) : (
                  productData.description?.materials?.join(", ") || "N/A"
                )}
              </li>
              <li>
                <strong>Weight:</strong>
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={editedProduct.description?.weight?.value || ""}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: {
                            ...editedProduct.description,
                            weight: {
                              ...editedProduct.description?.weight,
                              value: e.target.value,
                            },
                          },
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.description?.weight?.unit || ""}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: {
                            ...editedProduct.description,
                            weight: {
                              ...editedProduct.description?.weight,
                              unit: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </>
                ) : (
                  `${productData.description?.weight?.value || ""} ${
                    productData.description?.weight?.unit || ""
                  }`
                )}
              </li>
            </ul>
          </li>
        </ul>
        {/* Buttons for Supervisor-Control */}
        {isSupervisor && (
          <div className="supervisor-controls">
            {isEditing ? (
              <>
                {/* Formularfelder für die Bearbeitung */}
                <button onClick={handleSaveChanges}>Saved Changes</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditProduct}>Product Edit</button>
            )}
            <button
              onClick={() => handleDeleteProduct(productData.productNumber)}
            >
              Delete Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


export default ProductDetails;
