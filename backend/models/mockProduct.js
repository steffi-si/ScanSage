import Product from "./product.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const mockProducts = [
  {
    name: "T Shirt",
    category: "Clothing",
    price: {
      purchasePrice: { value: 10.0, currency: "USD" },
      sellingPrice: { value: 20.0, currency: "USD" },
      nonBindingSalesPrice: { value: 15.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["blue", "black", "grey"],
    fragile: false,
    packagingSize: [30, 20, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "A2",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "FashionCo",
      longDescription: "Comfortable cotton T-shirt for everyday wear",
      materials: ["cotton"],
      weight: { value: 0.2, unit: "kg" },
      customAttributes: [
        { key: "size", value: ["S", "M", "L", "XL"] },
        { key: "neckline", value: "Crew  neck" },
      ],
    },
    amount: 723,
    minAmount: 100
  },
  {
    name: "Dress",
    category: "Clothing",
    price: {
      purchasePrice: { value: 30.0, currency: "USD" },
      sellingPrice: { value: 45.0, currency: "USD" },
      nonBindingSalesPrice: { value: 40.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["red", "blue", "green"],
    fragile: false,
    packagingSize: [30, 20, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "A3",
    supplierNumber: null,
    status: "almost_sold_out",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "FashionCo",
      longDescription: "Comfortable dress for everyday wear",
      materials: ["cotton"],
      weight: { value: 0.5, unit: "kg" },
      customAttributes: [{ key: "size", value: ["S", "M", "L", "XL"] }],
    },
    amount: 527,
    minAmount: 90,
    orderedQuantity: 0
  },
  {
    name: "Sunglasses",
    category: "Accessories",
    price: {
      purchasePrice: { value: 5.0, currency: "USD" },
      sellingPrice: { value: 10.0, currency: "USD" },
      nonBindingSalesPrice: { value: 7.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["black", "brown", "blue"],
    fragile: true,
    packagingSize: [15, 5, 2],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "B1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in_delivery",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "Stylos",
      longDescription: "Anti-reflective unisex sunglasses",
      materials: ["plastic"],
      weight: { value: 0.1, unit: "kg" },
    },
    amount: 312,
    minAmount: 50
  },
  {
    name: "Hat",
    category: "Accessories",
    price: {
      purchasePrice: { value: 3.0, currency: "USD" },
      sellingPrice: { value: 5.0, currency: "USD" },
      nonBindingSalesPrice: { value: 4.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["red", "blue", "green"],
    fragile: false,
    packagingSize: [10, 10, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "B2",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "Stylos",
      longDescription: "fashionable unisex hat",
      materials: ["Felt"],
      weight: { value: 0.3, unit: "kg" },
      customAttributes: [{ key: "size", value: ["S", "M", "L", "XL"] }],
    },
    amount: 381,
    minAmount: 50
  },
  {
    name: "Socks",
    category: "Clothing",
    price: {
      purchasePrice: { value: 2.0, currency: "USD" },
      sellingPrice: { value: 3.0, currency: "USD" },
      nonBindingSalesPrice: { value: 2.5, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["white", "black", "grey", "blue"],
    fragile: false,
    packagingSize: [5, 5, 2],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "B3",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "FashionCo",
      longDescription: "Comfortable socks for everyday wear",
      materials: ["cotton", "polyester"],
      weight: { value: 0.2, unit: "kg" },
    },
    amount: 455,
    minAmount: 100
  },
  {
    name: "Shoes",
    category: "Clothing",
    price: {
      purchasePrice: { value: 30.0, currency: "USD" },
      sellingPrice: { value: 50.0, currency: "USD" },
      nonBindingSalesPrice: { value: 40.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "brown", "white"],
    fragile: false,
    packagingSize: [20, 10, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "B4",
    supplierNumber: null,
    status: "packing_station",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "ShoeVici",
      longDescription: "Comfortable cotton T-shirt for everyday wear",
      materials: ["cotton"],
      weight: { value: 0.2, unit: "kg" },
      customAttributes: [
        { key: "size", value: ["S", "M", "L", "XL"] },
        { key: "neckline", value: "Crew  neck" },
      ],
    },
    amount: 120,
    minAmount: 20
  },
  {
    name: "TV",
    category: "Electronic",
    price: {
      purchasePrice: { value: 500.0, currency: "USD" },
      sellingPrice: { value: 700.0, currency: "USD" },
      nonBindingSalesPrice: { value: 600.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["black", "silver"],
    fragile: true,
    packagingSize: [100, 10, 50],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C1",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TechVision",
      model: "SmartView 4K",
      longDescription:
        "4K Ultra HD Smart TV with HDR and built-in streaming apps",
      features: [
        "4K resolution",
        "HDR",
        "Smart TV capabilities",
        "Voice control",
      ],
      weight: { value: 15, unit: "kg" },
      dimensions: {
        length: 120,
        width: 5,
        height: 70,
        unit: "cm",
      },
      warranty: { duration: 2, unit: "years" },
      customAttributes: [
        { key: "screenSize", value: 55 },
        { key: "refreshRate", value: "120Hz" },
      ],
    },
    amount: 43,
    minAmount: 10
  },
  {
    name: "Smartphone",
    category: "Electronic",
    price: {
      purchasePrice: { value: 200.0, currency: "USD" },
      sellingPrice: { value: 300.0, currency: "USD" },
      nonBindingSalesPrice: { value: 250.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "silver"],
    fragile: false,
    packagingSize: [10, 5, 1],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C1",
    supplierNumber: null,
    status: "almost_sold_out",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "Sansung",
      model: "Smart P52",
      longDescription:
        "Ultra smart Smartphone with voice control and waterproof",
      features: ["Waterproof", "AI assistant", "Voice control"],
      weight: { value: 0.3, unit: "kg" },
      dimensions: {
        length: 15,
        width: 7.5,
        height: 1,
        unit: "cm",
      },
      warranty: { duration: 2, unit: "years" },
      customAttributes: [{ key: "screenSize", value: 5.8 }],
    },
    amount: 26,
    minAmount: 10,
    orderedQuantity: 0
  },
  {
    name: "Laptop",
    category: "Electronic",
    price: {
      purchasePrice: { value: 500.0, currency: "USD" },
      sellingPrice: { value: 700.0, currency: "USD" },
      nonBindingSalesPrice: { value: 600.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["black", "silver"],
    fragile: false,
    packagingSize: [20, 15, 2],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in_delivery",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "LH",
      model: "LH-123",
      longDescription:
        "Multimedia laptop specialising in entertainment from streaming to gaming",
      features: ["4K", "AI assistant", "Voice control", "SSD", "Multi core"],
      weight: { value: 5, unit: "kg" },
      dimensions: {
        length: 25,
        width: 33,
        height: 4,
        unit: "cm",
      },
      warranty: { duration: 2, unit: "years" },
      customAttributes: [{ key: "screenSize", value: 14 }],
    },
    amount: 74,
    minAmount: 15
  },
  {
    name: "Headphones",
    category: "Electronic",
    price: {
      purchasePrice: { value: 10.0, currency: "USD" },
      sellingPrice: { value: 20.0, currency: "USD" },
      nonBindingSalesPrice: { value: 15.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "white"],
    fragile: false,
    packagingSize: [10, 5, 2],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C3",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "HeadTech",
      model: "SoundWire Pro",
      longDescription:
        "High-quality wired headphones with excellent sound quality",
      features: [
        "3,5mm jack plug",
        "noise isolation",
        "inline remote control",
      ],
      weight: { value: 0.25, unit: "kg" },
      dimensions: {
        length: 18,
        width: 8,
        height: 20,
        unit: "cm",
      },
      warranty: { duration: 2, unit: "years" },
      customAttributes: [
        { key: "cableLength", value: "1.5m" },
        { key: "impedance", value: "32 Ohm" },
      ],
    },
    amount: 23,
    minAmount: 10
  },
  {
    name: "Coffee Maker",
    category: "Appliances",
    price: {
      purchasePrice: { value: 40.0, currency: "USD" },
      sellingPrice: { value: 60.0, currency: "USD" },
      nonBindingSalesPrice: { value: 55.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "silver", "red"],
    fragile: true,
    packagingSize: [30, 25, 40],
    fillingMaterial: { required: true, amount: 2 },
    shelf: "E1",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "ApplianceMaster",
      model: "Coffeemaster Pro",
      longDescription:
        "Fully automatic coffee machine with customisable preset programmes",
      materials: ["aluminium", "plastic", "iron"],
      weight: { value: 8, unit: "kg" },
      dimensions: {
        length: 35,
        width: 45,
        height: 40,
        unit: "cm",
      },
    },
    amount: 51,
    minAmount: 20
  },
  {
    name: "Blender",
    category: "Appliances",
    price: {
      purchasePrice: { value: 25.0, currency: "USD" },
      sellingPrice: { value: 45.0, currency: "USD" },
      nonBindingSalesPrice: { value: 40.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["white", "black"],
    fragile: true,
    packagingSize: [20, 20, 35],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "E2",
    supplierNumber: null,
    status: "packing_station",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "ApplianceMaster",
      model: "BlendPro 3000",
      longDescription: "Powerful blender for smoothies and soups",
      materials: ["plastic", "stainless steel"],
      weight: { value: 3.5, unit: "kg" },
      dimensions: {
        length: 18,
        width: 18,
        height: 40,
        unit: "cm",
      },
      customAttributes: [
        { key: "power", value: "1000W" },
        { key: "capacity", value: "1.5L" },
      ],
    },
    amount: 87,
    minAmount: 20
  },
  {
    name: "Yoga Mat",
    category: "Sports",
    price: {
      purchasePrice: { value: 15.0, currency: "USD" },
      sellingPrice: { value: 25.0, currency: "USD" },
      nonBindingSalesPrice: { value: 22.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["purple", "blue", "green"],
    fragile: false,
    packagingSize: [60, 10, 10],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F1",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "YogaFlex",
      model: "EcoMat Pro",
      longDescription:
        "Environmentally friendly, non-slip yoga mat for optimum grip",
      materials: ["TPE", "natural rubber"],
      weight: { value: 1.2, unit: "kg" },
      dimensions: {
        length: 183,
        width: 61,
        height: 0.8,
        unit: "cm",
      },
      customAttributes: [
        { key: "eco-friendly", value: true },
        { key: "non-slip", value: true },
      ],
    },
    amount: 107,
    minAmount: 20
  },
  {
    name: "Running Shoes",
    category: "Sports",
    price: {
      purchasePrice: { value: 40.0, currency: "USD" },
      sellingPrice: { value: 80.0, currency: "USD" },
      nonBindingSalesPrice: { value: 70.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "white", "neon yellow"],
    fragile: false,
    packagingSize: [30, 20, 15],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F2",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "SportsFlex",
      model: "AirSpeed Pro",
      longDescription:
        "Lightweight running shoes with superior cushioning and breathability",
      materials: ["mesh", "synthetic leather", "rubber"],
      weight: { value: 0.3, unit: "kg" },
      customAttributes: [
        { key: "size", value: ["7", "8", "9", "10", "11"] },
        { key: "type", value: "Neutral running" },
      ],
    },
    amount: 201,
    minAmount: 30
  },
  {
    name: "Microwave",
    category: "Appliances",
    price: {
      purchasePrice: { value: 60.0, currency: "USD" },
      sellingPrice: { value: 100.0, currency: "USD" },
      nonBindingSalesPrice: { value: 90.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["white", "black", "stainless steel"],
    fragile: true,
    packagingSize: [50, 40, 30],
    fillingMaterial: { required: true, amount: 2 },
    shelf: "E3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in_delivery",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "ApplianceMaster",
      model: "QuickHeat 1000",
      longDescription:
        "Compact microwave with multiple power levels and defrost function",
      materials: ["metal", "glass", "plastic"],
      weight: { value: 11, unit: "kg" },
      dimensions: {
        length: 45,
        width: 35,
        height: 26,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "20L" },
        { key: "power", value: "800W" },
      ],
    },
    amount: 92,
    minAmount: 20
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: {
      purchasePrice: { value: 25.0, currency: "USD" },
      sellingPrice: { value: 50.0, currency: "USD" },
      nonBindingSalesPrice: { value: 45.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "navy", "red"],
    fragile: false,
    packagingSize: [40, 30, 20],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "B5",
    supplierNumber: null,
    status: "almost_sold_out",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TravelGear",
      model: "Explorer Pro",
      longDescription:
        "Robust and spacious backpack for everyday use and travelling",
      materials: ["polyester", "nylon"],
      weight: { value: 0.8, unit: "kg" },
      dimensions: {
        length: 45,
        width: 30,
        height: 20,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "30L" },
        { key: "waterproof", value: true },
      ],
    },
    amount: 54,
    minAmount: 20,
    orderedQuantity: 0
  },
  {
    name: "Desk Lamp",
    category: "Furniture",
    price: {
      purchasePrice: { value: 15.0, currency: "USD" },
      sellingPrice: { value: 30.0, currency: "USD" },
      nonBindingSalesPrice: { value: 25.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["white", "black", "silver"],
    fragile: true,
    packagingSize: [25, 15, 15],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "D6",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "LightCraft",
      model: "FlexiLight",
      longDescription: "Adjustable desk lamp with energy-efficient LED bulb",
      materials: ["aluminium", "plastic"],
      weight: { value: 0.8, unit: "kg" },
      dimensions: {
        length: 30,
        width: 15,
        height: 40,
        unit: "cm",
      },
      customAttributes: [
        { key: "bulbType", value: "LED" },
        { key: "colorTemperature", value: "3000K-6500K adjustable" },
      ],
    },
    amount: 72,
    minAmount: 25
  },
  {
    name: "Water Bottle",
    category: "Sports",
    price: {
      purchasePrice: { value: 5.0, currency: "USD" },
      sellingPrice: { value: 15.0, currency: "USD" },
      nonBindingSalesPrice: { value: 12.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["blue", "green", "pink"],
    fragile: false,
    packagingSize: [25, 8, 8],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F3",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "HydroTech",
      model: "EcoSip Pro",
      longDescription:
        "Durable and environmentally friendly water bottle for sports and outdoor activities",
      materials: ["BPA-free plastic", "stainless steel"],
      weight: { value: 0.3, unit: "kg" },
      dimensions: {
        length: 22,
        width: 7,
        height: 7,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "750ml" },
        { key: "insulated", value: true },
        { key: "dishwasherSafe", value: true },
      ],
    },
    amount: 63,
    minAmount: 20
  },
  {
    name: "Gaming Mouse",
    category: "Electronic",
    price: {
      purchasePrice: { value: 20.0, currency: "USD" },
      sellingPrice: { value: 40.0, currency: "USD" },
      nonBindingSalesPrice: { value: 35.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "white", "rgb"],
    fragile: false,
    packagingSize: [15, 10, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "C4",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TechGear",
      model: "ProGamer X1",
      longDescription:
        "High-precision gaming mouse with customisable RGB lighting and programmable buttons",
      materials: ["ABS-plastic", "rubber"],
      weight: { value: 0.1, unit: "kg" },
      dimensions: {
        length: 12,
        width: 6,
        height: 4,
        unit: "cm",
      },
      customAttributes: [
        { key: "dpi", value: "16000" },
        { key: "pollingRate", value: "1000Hz" },
        { key: "programmableButtons", value: 8 },
      ],
    },
    amount: 47,
    minAmount: 30
  },
  {
    name: "Toaster",
    category: "Appliances",
    price: {
      purchasePrice: { value: 15.0, currency: "USD" },
      sellingPrice: { value: 30.0, currency: "USD" },
      nonBindingSalesPrice: { value: 25.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["silver", "black", "red"],
    fragile: true,
    packagingSize: [30, 20, 25],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "E4",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "KitchenPro",
      model: "ToastMaster 3000",
      longDescription:
        "Efficient toaster with multiple browning levels and defrost function",
      materials: ["stainless steel", "plastic"],
      weight: { value: 1.5, unit: "kg" },
      dimensions: {
        length: 28,
        width: 18,
        height: 20,
        unit: "cm",
      },
      customAttributes: [
        { key: "power", value: "800W" },
        { key: "slots", value: 2 },
        { key: "functions", value: ["defrost", "reheat", "cancel"] },
      ],
    },
    amount: 23,
    minAmount: 20
  },
  {
    name: "Fitness Tracker",
    category: "Electronic",
    price: {
      purchasePrice: { value: 30.0, currency: "USD" },
      sellingPrice: { value: 60.0, currency: "USD" },
      nonBindingSalesPrice: { value: 50.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "blue", "pink"],
    fragile: false,
    packagingSize: [10, 5, 2],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "C5",
    supplierNumber: null,
    status: "in_stock",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TechFit",
      model: "HealthPro X1",
      longDescription:
        "Advanced fitness tracker with heart rate measurement and sleep analysis",
      materials: ["silicone", "plastic"],
      weight: { value: 0.03, unit: "kg" },
      dimensions: {
        length: 4,
        width: 2,
        height: 1,
        unit: "cm",
      },
      customAttributes: [
        { key: "batteryLife", value: "7 days" },
        { key: "waterResistance", value: "5 ATM" },
        {
          key: "features",
          value: [
            "heart rate measurement",
            "pedometer",
            "sleep analysis",
            "smartphone notifications",
          ],
        },
      ],
    },
    amount: 31,
    minAmount: 20
  },
  {
    name: "Wireless Earbuds",
    category: "Electronic",
    price: {
      purchasePrice: { value: 50.0, currency: "USD" },
      sellingPrice: { value: 100.0, currency: "USD" },
      nonBindingSalesPrice: { value: 90.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "white", "blue"],
    fragile: true,
    packagingSize: [10, 5, 3],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C6",
    supplierNumber: null,
    status: "almost_sold_out",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "SoundTech",
      model: "AirPods Pro X",
      longDescription:
        "High-quality wireless in-ear headphones with active noise cancellation",
      materials: ["plastic", "silicone"],
      weight: { value: 0.05, unit: "kg" },
      dimensions: {
        length: 5,
        width: 4,
        height: 2,
        unit: "cm",
      },
      customAttributes: [
        { key: "batteryLife", value: "6 hours" },
        { key: "waterResistance", value: "IPX4" },
        {
          key: "features",
          value: [
            "active noise cancellation",
            "Bluetooth 5.0",
            "touch control",
            "voice assistant support",
          ],
        },
      ],
    },
    amount: 59,
    minAmount: 25,
    orderedQuantity: 0
  },
  {
    name: "Hiking Boots",
    category: "Sports",
    price: {
      purchasePrice: { value: 45.0, currency: "USD" },
      sellingPrice: { value: 90.0, currency: "USD" },
      nonBindingSalesPrice: { value: 80.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "brown", "blue", "green"],
    fragile: false,
    packagingSize: [35, 25, 15],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F4",
    supplierNumber: null,
    status: "almost_sold_out",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TrailMaster",
      model: "AllTerrain Pro",
      longDescription: "Robust hiking boots for demanding outdoor adventures",
      materials: ["leather", "gore-tex", "rubber"],
      weight: { value: 1.2, unit: "kg" },
      dimensions: {
        length: 32,
        width: 12,
        height: 20,
        unit: "cm",
      },
      customAttributes: [
        { key: "waterproof", value: true },
        { key: "ankleSupport", value: "High" },
        {
          key: "size",
          value: ["38", "39", "40", "41", "42", "43", "44", "45"],
        },
      ],
    },
    amount: 34,
    minAmount: 20,
    orderedQuantity: 0
  },
  {
    name: "Smart Watch",
    category: "Electronic",
    price: {
      purchasePrice: { value: 100.0, currency: "USD" },
      sellingPrice: { value: 200.0, currency: "USD" },
      nonBindingSalesPrice: { value: 180.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "silver", "gold"],
    fragile: true,
    packagingSize: [10, 10, 5],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C7",
    deliveryVan: "Van-4",
    supplierNumber: null,
    status: "in_delivery",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TechWear",
      model: "LifeTrack Pro",
      longDescription:
        "Advanced smartwatch with health tracking and smartphone integration",
      features: [
        "Heart rate Monitor",
        "GPS",
        "Water resistant",
        "Sleep tracking",
      ],
      weight: { value: 0.05, unit: "kg" },
      warranty: { duration: 1, unit: "years" },
      customAttributes: [
        { key: "batteryLife", value: "Up to 5 days" },
        { key: "compatibility", value: ["iOS", "Android"] },
      ],
    },
    amount: 70,
    minAmount: 20
  },
  {
    name: "Air Fryer",
    category: "Appliances",
    price: {
      purchasePrice: { value: 40.0, currency: "USD" },
      sellingPrice: { value: 80.0, currency: "USD" },
      nonBindingSalesPrice: { value: 70.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["black", "white"],
    fragile: true,
    packagingSize: [35, 35, 40],
    fillingMaterial: { required: true, amount: 2 },
    shelf: "E5",
    deliveryVan: "Van-5",
    supplierNumber: null,
    status: "in_delivery",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "ApplianceMaster",
      model: "AirCrisp Pro",
      longDescription:
        "Versatile air fryer for healthy cooking with little oil",
      materials: ["plastic", "stainless steel"],
      weight: { value: 5, unit: "kg" },
      dimensions: {
        length: 30,
        width: 30,
        height: 35,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "4L" },
        { key: "power", value: "1500W" },
        {
          key: "features",
          value: ["digital display", "preset programmes", "non-stick coating"],
        },
      ],
    },
    amount: 23,
    minAmount: 15
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronic",
    price: {
      purchasePrice: { value: 25.0, currency: "USD" },
      sellingPrice: { value: 50.0, currency: "USD" },
      nonBindingSalesPrice: { value: 45.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["black", "blue", "red"],
    fragile: true,
    packagingSize: [20, 15, 10],
    fillingMaterial: { required: true, amount: 1 },
    shelf: "C8",
    supplierNumber: null,
    status: "packing_station",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "SoundTech",
      model: "BassBoost X1",
      description:
        "Tragbarer Bluetooth-Lautsprecher mit kraftvollem Sound und langer Akkulaufzeit",
      materials: ["Kunststoff", "Metall"],
      weight: { value: 0.5, unit: "kg" },
      dimensions: {
        length: 18,
        width: 8,
        height: 8,
        unit: "cm",
      },
      customAttributes: [
        { key: "batteryLife", value: "12 hours" },
        { key: "waterResistance", value: "IPX5" },
        {
          key: "features",
          value: ["Bluetooth 5.0", "Freisprechfunktion", "NFC-Kopplung"],
        },
      ],
    },
    amount: 27,
    minAmount: 20
  },
  {
    name: "Yoga Block",
    category: "Sports",
    price: {
      purchasePrice: { value: 5.0, currency: "USD" },
      sellingPrice: { value: 15.0, currency: "USD" },
      nonBindingSalesPrice: { value: 12.0, currency: "USD" },
    },
    expressDispatch: false,
    availableColours: ["purple", "blue", "red", "green", "black"],
    fragile: false,
    packagingSize: [23, 15, 10],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F5",
    supplierNumber: null,
    status: "packing_station",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "YogaEssentials",
      model: "SupportPro",
      longDescription:
        "High-density foam yoga block for improved stability and support",
      materials: ["EVA foam"],
      weight: { value: 0.3, unit: "kg" },
      dimensions: {
        length: 22,
        width: 14,
        height: 9,
        unit: "cm",
      },
      customAttributes: [
        { key: "density", value: "High" },
        { key: "nonSlip", value: true },
      ],
    },
    amount: 15,
    minAmount: 5
  },
  {
    name: "Portable charger",
    category: "Electronic",
    price: {
      purchasePrice: { value: 15.0, currency: "USD" },
      sellingPrice: { value: 30.0, currency: "USD" },
      nonBindingSalesPrice: { value: 25.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["white", "black"],
    fragile: false,
    packagingSize: [15, 8, 2],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "C9",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "PowerTech",
      model: "PowerBank Pro",
      longDescription: "Compact and powerful portable battery for travelling",
      materials: ["plastic", "lithium-ion battery"],
      weight: { value: 0.2, unit: "kg" },
      dimensions: {
        length: 14,
        width: 7,
        height: 1.5,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "10000mAh" },
        { key: "ports", value: ["USB-A", "USB-C"] },
        { key: "fastCharging", value: true },
      ],
    },
    amount: 64,
    minAmount: 25
  },
  {
    name: "Portable charger",
    category: "Electronic",
    price: {
      purchasePrice: { value: 15.0, currency: "USD" },
      sellingPrice: { value: 30.0, currency: "USD" },
      nonBindingSalesPrice: { value: 25.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["white", "black"],
    fragile: false,
    packagingSize: [15, 8, 2],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "C9",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "TechVision",
      model: "PowerBoost X2",
      longDescription: "Powerful and compact power bank for travelling",
      materials: ["aluminium", "lithium polymer battery"],
      weight: { value: 0.25, unit: "kg" },
      dimensions: {
        length: 14.5,
        width: 7.5,
        height: 1.8,
        unit: "cm",
      },
      customAttributes: [
        { key: "capacity", value: "20000mAh" },
        { key: "ports", value: ["USB-A", "USB-C", "Micro-USB"] },
        { key: "fastCharging", value: true },
        { key: "wirelessCharging", value: true },
      ],
    },
    amount: 20,
    minAmount: 10
  },
  {
    name: "Resistance Bands",
    category: "Sports",
    price: {
      purchasePrice: { value: 8.0, currency: "USD" },
      sellingPrice: { value: 20.0, currency: "USD" },
      nonBindingSalesPrice: { value: 18.0, currency: "USD" },
    },
    expressDispatch: true,
    availableColours: ["multicolor"],
    fragile: false,
    packagingSize: [15, 10, 5],
    fillingMaterial: { required: false, amount: 0 },
    shelf: "F6",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: null,
      format: "CODE128",
      lastScanned: new Date(),
    },
    description: {
      manufacturer: "SportsFlex",
      model: "FlexiStrength Set",
      longDescription:
        "Versatile set of resistance bands for strength and flexibility training",
      materials: ["latex", "nylon"],
      weight: { value: 0.3, unit: "kg" },
      dimensions: {
        length: 150,
        width: 5,
        thickness: 0.2,
        unit: "cm",
      },
      customAttributes: [
        { key: "resistanceLevels", value: ["Light", "Medium", "Heavy"] },
        {
          key: "setContents",
          value: "3 bands, carrying bag, exercise instructions",
        },
      ],
    },
    amount: 30,
    minAmount: 10
  },
];

async function createMockProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/storage");
    await Product.deleteMany({});

    for (const productData of mockProducts) {
      const productNumber = uuidv4();

      const product = new Product({
        ...productData,
        productNumber: productNumber,
        barcode: {
          ...productData.barcode,
          value: productNumber,
        },
        amount: productData.amount,
        minAmount: productData.minAmount
      });

      await product.save();
      console.log(`Created product: ${product.name}`);
    }

    console.log("Mock data created successfully");
  } catch (err) {
    console.error("Error creating mock data:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

createMockProducts();
