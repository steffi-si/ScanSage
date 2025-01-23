import { Link } from "react-router-dom";
import Barcode from "react-barcode";


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
              format={product.barcode.format || "EAN13"}
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
        <Link
          to={`/product-detail/${product.productNumber}`}
          className="product-link"
        >
          Product Details
        </Link>
      </div>
    );
}

export default ProductCard;