import Product from "./product.js";
import mongoose from "mongoose";

const mockProducts = [
  {
    name: "T Shirt",
    category: "Clothing",
    price: {
      purchasePrice: 10.0,
      sellingPrice: 15.0,
      nonBindingSalesPrice: 12.0,
    },
    expressDispatch: true,
    availableColours: ["red", "blue", "green"],
    fragile: false,
    packagingSize: [30, 20, 2],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "A1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Jeans",
    category: "Clothing",
    price: {
      purchasePrice: 20.0,
      sellingPrice: 30.0,
      nonBindingSalesPrice: 25.0,
    },
    expressDispatch: false,
    availableColours: ["blue", "black", "grey"],
    fragile: false,
    packagingSize: [30, 20, 5],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "A2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Dress",
    category: "Clothing",
    price: {
      purchasePrice: 30.0,
      sellingPrice: 45.0,
      nonBindingSalesPrice: 40.0,
    },
    expressDispatch: true,
    availableColours: ["red", "blue", "green"],
    fragile: false,
    packagingSize: [30, 20, 5],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "A3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Sunglasses",
    category: "Accessories",
    price: {
      purchasePrice: 5.0,
      sellingPrice: 10.0,
      nonBindingSalesPrice: 7.0,
    },
    expressDispatch: false,
    availableColours: ["black", "brown", "blue"],
    fragile: true,
    packagingSize: [15, 5, 2],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "B1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Hat",
    category: "Accessories",
    price: {
      purchasePrice: 3.0,
      sellingPrice: 5.0,
      nonBindingSalesPrice: 4.0,
    },
    expressDispatch: true,
    availableColours: ["red", "blue", "green"],
    fragile: false,
    packagingSize: [10, 10, 5],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "B2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Socks",
    category: "Clothing",
    price: {
      purchasePrice: 2.0,
      sellingPrice: 3.0,
      nonBindingSalesPrice: 2.5,
    },
    expressDispatch: false,
    availableColours: ["white", "black", "grey", "blue"],
    fragile: false,
    packagingSize: [5, 5, 2],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "B3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Shoes",
    category: "Clothing",
    price: {
      purchasePrice: 30.0,
      sellingPrice: 50.0,
      nonBindingSalesPrice: 40.0,
    },
    expressDispatch: true,
    availableColours: ["black", "brown", "white"],
    fragile: false,
    packagingSize: [20, 10, 5],
    fillingMaterial: {
      required: false,
      amount: 0,
    },
    shelf: "B4",
    deliveryVan: "Van-4",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "TV",
    category: "Electronic",
    price: {
      purchasePrice: 500.0,
      sellingPrice: 700.0,
      nonBindingSalesPrice: 600.0,
    },
    expressDispatch: false,
    availableColours: ["black", "silver"],
    fragile: true,
    packagingSize: [100, 10, 50],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "C1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Smartphone",
    category: "Electronic",
    price: {
      purchasePrice: 200.0,
      sellingPrice: 300.0,
      nonBindingSalesPrice: 250.0,
    },
    expressDispatch: true,
    availableColours: ["black", "silver"],
    fragile: false,
    packagingSize: [10, 5, 1],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "C1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Laptop",
    category: "Electronic",
    price: {
      purchasePrice: 500.0,
      sellingPrice: 700.0,
      nonBindingSalesPrice: 600.0,
    },
    expressDispatch: false,
    availableColours: ["black", "silver"],
    fragile: false,
    packagingSize: [20, 15, 2],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "C2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Headphones",
    category: "Electronic",
    price: {
      purchasePrice: 10.0,
      sellingPrice: 20.0,
      nonBindingSalesPrice: 15.0,
    },
    expressDispatch: true,
    availableColours: ["black", "white"],
    fragile: false,
    packagingSize: [10, 5, 2],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "C3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Smartwatch",
    category: "Electronic",
    price: {
      purchasePrice: 50.0,
      sellingPrice: 100.0,
      nonBindingSalesPrice: 75.0,
    },
    expressDispatch: false,
    availableColours: ["black", "silver"],
    fragile: false,
    packagingSize: [5, 5, 2],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "C4",
    deliveryVan: "Van-4",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Chair",
    category: "Furniture",
    price: {
      purchasePrice: 50.0,
      sellingPrice: 100.0,
      nonBindingSalesPrice: 75.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white"],
    fragile: false,
    packagingSize: [50, 50, 100],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "D1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Table",
    category: "Furniture",
    price: {
      purchasePrice: 50.0,
      sellingPrice: 100.0,
      nonBindingSalesPrice: 75.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white"],
    fragile: false,
    packagingSize: [120, 80, 10],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "D2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Sofa",
    category: "Furniture",
    price: {
      purchasePrice: 200.0,
      sellingPrice: 400.0,
      nonBindingSalesPrice: 350.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white", "grey"],
    fragile: false,
    packagingSize: [200, 100, 80],
    fillingMaterial: {
      required: true,
      amount: 2,
    },
    shelf: "D3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Bed",
    category: "Furniture",
    price: {
      purchasePrice: 150.0,
      sellingPrice: 300.0,
      nonBindingSalesPrice: 250.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white", "brown"],
    fragile: false,
    packagingSize: [200, 160, 30],
    fillingMaterial: {
      required: true,
      amount: 2,
    },
    shelf: "D4",
    deliveryVan: "Van-4",
    supplierNumber: null,
    status: "in stock",
  },
  {
    name: "Wardrobe",
    category: "Furniture",
    price: {
      purchasePrice: 100.0,
      sellingPrice: 200.0,
      nonBindingSalesPrice: 180.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white", "brown"],
    fragile: false,
    packagingSize: [100, 40, 20],
    fillingMaterial: {
      required: true,
      amount: 1,
    },
    shelf: "D5",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in stock",
  },
];

async function createMockProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/storage");
    await Product.deleteMany({});

    for (const productData of mockProducts) {
      const product = new Product(productData);
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
