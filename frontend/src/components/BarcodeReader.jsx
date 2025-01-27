import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

function BarcodeReader({ onScan, onError }) {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      onScan(result);
      setIsScanning(false);
    }
  };

  return (
    <div className="barcode-reader">
      <button onClick={() => setIsScanning(!isScanning)}>
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
      {/* {isScanning && (
        <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
          <BarcodeScanner onDetected={handleScan} />
        </div>
      )} */}
      <BarcodeScanner />
      {/* {scanResult && <p>Scan result: {scanResult}</p>} */}
    </div>
  );
}

export default BarcodeReader;
