import React, { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import Barcode from "react-barcode";

function BarcodeReader({onScan, onError}) {
  const [scanResult, setScanresult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setScanresult(result);
      onScan(result);
    }
  };

  return (
    <div className="barcode-scanner">
      <BarcodeScanner
        options={{formats: ["EAN-13", "UPC", "CODE128", "QR"]}}
        onDetected={(result) => {
          if (result) {
            onScan(result.text);
          }
        }}
        onError={onError}
      />
      {scanResult && <p>Scan result: {scanResult}</p>}
    </div>
  );
}

function BarcodeGenerator() {
  const [barcodeValue, setBarcodeValue] = useState(''); 

  return (
    <div className="barcode-generator">
      {barcodeValue && <Barcode value={barcodeValue} format='CODE128'/> }
    </div>
  );
}

export {BarcodeReader, BarcodeGenerator};




