import React, { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import Barcode from "react-barcode";

function BarcodeReader({onScan, onError}) {
  const [scanResult, setScanresult] = useState(null);

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
    </div>
  );
}

function BarcodeGenerator() {
  const [barcodeValue, setBarcodeValue] = useState('0bd7a2f5-f277-4837-a7fa-a21b281d5e87'); 

  return (
    <div className="barcode-generator">
      <Barcode value={barcodeValue} format='CODE128'/> 
    </div>
  );
}

export {BarcodeReader, BarcodeGenerator};


//youtube video for example

