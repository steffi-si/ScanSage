import Product from "./product.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const mockProducts = [
  {
    name: "T Shirt",
    category: "Clothing",
    price: {
      purchasePrice: 10.0,
      sellingPrice: 20.0,
      nonBindingSalesPrice: 15.0,
    },
    expressDispatch: false,
    availableColours: ["blue", "black", "grey"],
    fragile: false,
    packagingSize: [30, 20, 5],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "A2",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 0
    },
    shelf: "A3",
    supplierNumber: null,
    status: "almost sold out",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 1
    },
    shelf: "B1",
    deliveryVan: "Van-1",
    supplierNumber: null,
    status: "in delivery",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 0
    },
    shelf: "B2",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 0
    },
    shelf: "B3",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 0
    },
    shelf: "B4",
    supplierNumber: null,
    status: "packing station",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 1
    },
    shelf: "C1",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 1
    },
    shelf: "C1",
    supplierNumber: null,
    status: "almost sold out",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 1
    },
    shelf: "C2",
    deliveryVan: "Van-2",
    supplierNumber: null,
    status: "in delivery",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
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
      amount: 1
    },
    shelf: "C3",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Coffee Maker",
    category: "Appliances",
    price: {
      purchasePrice: 40.0,
      sellingPrice: 60.0,
      nonBindingSalesPrice: 55.0,
    },
    expressDispatch: true,
    availableColours: ["black", "silver", "red"],
    fragile: true,
    packagingSize: [30, 25, 40],
    fillingMaterial: {
      required: true,
      amount: 2
    },
    shelf: "E1",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Blender",
    category: "Appliances",
    price: {
      purchasePrice: 25.0,
      sellingPrice: 45.0,
      nonBindingSalesPrice: 40.0,
    },
    expressDispatch: false,
    availableColours: ["white", "black"],
    fragile: true,
    packagingSize: [20, 20, 35],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "E2",
    supplierNumber: null,
    status: "packing station",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Yoga Mat",
    category: "Sports",
    price: {
      purchasePrice: 15.0,
      sellingPrice: 25.0,
      nonBindingSalesPrice: 22.0,
    },
    expressDispatch: true,
    availableColours: ["purple", "blue", "green"],
    fragile: false,
    packagingSize: [60, 10, 10],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F1",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Running Shoes",
    category: "Sports",
    price: {
      purchasePrice: 40.0,
      sellingPrice: 80.0,
      nonBindingSalesPrice: 70.0,
    },
    expressDispatch: true,
    availableColours: ["black", "white", "neon yellow"],
    fragile: false,
    packagingSize: [30, 20, 15],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F2",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Microwave",
    category: "Appliances",
    price: {
      purchasePrice: 60.0,
      sellingPrice: 100.0,
      nonBindingSalesPrice: 90.0,
    },
    expressDispatch: false,
    availableColours: ["white", "black", "stainless steel"],
    fragile: true,
    packagingSize: [50, 40, 30],
    fillingMaterial: {
      required: true,
      amount: 2
    },
    shelf: "E3",
    deliveryVan: "Van-3",
    supplierNumber: null,
    status: "in delivery",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: {
      purchasePrice: 25.0,
      sellingPrice: 50.0,
      nonBindingSalesPrice: 45.0,
    },
    expressDispatch: true,
    availableColours: ["black", "navy", "red"],
    fragile: false,
    packagingSize: [40, 30, 20],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "B5",
    supplierNumber: null,
    status: "almost sold out",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Desk Lamp",
    category: "Furniture",
    price: {
      purchasePrice: 15.0,
      sellingPrice: 30.0,
      nonBindingSalesPrice: 25.0,
    },
    expressDispatch: true,
    availableColours: ["white", "black", "silver"],
    fragile: true,
    packagingSize: [25, 15, 15],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "D6",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Water Bottle",
    category: "Sports",
    price: {
      purchasePrice: 5.0,
      sellingPrice: 15.0,
      nonBindingSalesPrice: 12.0,
    },
    expressDispatch: false,
    availableColours: ["blue", "green", "pink"],
    fragile: false,
    packagingSize: [25, 8, 8],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F3",
    supplierNumber: null,
    status: "reordered",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Gaming Mouse",
    category: "Electronic",
    price: {
      purchasePrice: 20.0,
      sellingPrice: 40.0,
      nonBindingSalesPrice: 35.0,
    },
    expressDispatch: true,
    availableColours: ["black", "white", "rgb"],
    fragile: false,
    packagingSize: [15, 10, 5],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "C4",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Toaster",
    category: "Appliances",
    price: {
      purchasePrice: 15.0,
      sellingPrice: 30.0,
      nonBindingSalesPrice: 25.0,
    },
    expressDispatch: true,
    availableColours: ["silver", "black", "red"],
    fragile: true,
    packagingSize: [30, 20, 25],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "E4",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Fitness Tracker",
    category: "Electronic",
    price: {
      purchasePrice: 30.0,
      sellingPrice: 60.0,
      nonBindingSalesPrice: 50.0,
    },
    expressDispatch: true,
    availableColours: ["black", "blue", "pink"],
    fragile: false,
    packagingSize: [10, 5, 2],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "C5",
    supplierNumber: null,
    status: "in stock",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Wireless Earbuds",
    category: "Electronic",
    price: {
      purchasePrice: 50.0,
      sellingPrice: 100.0,
      nonBindingSalesPrice: 90.0,
    },
    expressDispatch: true,
    availableColours: ["black", "white", "blue"],
    fragile: true,
    packagingSize: [10, 5, 3],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "C6",
    supplierNumber: null,
    status: "almost sold out",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Hiking Boots",
    category: "Sports",
    price: {
      purchasePrice: 45.0,
      sellingPrice: 90.0,
      nonBindingSalesPrice: 80.0,
    },
    expressDispatch: true,
    availableColours: ["black", "brown", "blue", "green"],
    fragile: false,
    packagingSize: [35, 25, 15],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F4",
    supplierNumber: null,
    status: "almost sold out",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Smart Watch",
    category: "Electronic",
    price: {
      purchasePrice: 100.0,
      sellingPrice: 200.0,
      nonBindingSalesPrice: 180.0,
    },
    expressDispatch: true,
    availableColours: ["black", "silver", "gold"],
    fragile: true,
    packagingSize: [10, 10, 5],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "C7",
    deliveryVan: "Van-4",
    supplierNumber: null,
    status: "in delivery",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Air Fryer",
    category: "Appliances",
    price: {
      purchasePrice: 40.0,
      sellingPrice: 80.0,
      nonBindingSalesPrice: 70.0,
    },
    expressDispatch: false,
    availableColours: ["black", "white"],
    fragile: true,
    packagingSize: [35, 35, 40],
    fillingMaterial: {
      required: true,
      amount: 2
    },
    shelf: "E5",
    deliveryVan: "Van-5",
    supplierNumber: null,
    status: "in delivery",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronic",
    price: {
      purchasePrice: 25.0,
      sellingPrice: 50.0,
      nonBindingSalesPrice: 45.0,
    },
    expressDispatch: true,
    availableColours: ["black", "blue", "red"],
    fragile: true,
    packagingSize: [20, 15, 10],
    fillingMaterial: {
      required: true,
      amount: 1
    },
    shelf: "C8",
    supplierNumber: null,
    status: "packing station",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Yoga Block",
    category: "Sports",
    price: {
      purchasePrice: 5.0,
      sellingPrice: 15.0,
      nonBindingSalesPrice: 12.0,
    },
    expressDispatch: false,
    availableColours: ["purple", "blue", "red", "green", "black"],
    fragile: false,
    packagingSize: [23, 15, 10],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F5",
    supplierNumber: null,
    status: "packing station",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  },
  {
    name: "Portable charger",
    category: "Electronic",
    price: {
      purchasePrice: 5.0,
      sellingPrice: 15.0,
      nonBindingSalesPrice: 12.0,
    },
    expressDispatch: false,
    availableColours: ["purple", "blue", "red", "green", "black"],
    fragile: false,
    packagingSize: [23, 15, 10],
    fillingMaterial: {
      required: false,
      amount: 0
    },
    shelf: "F5",
    supplierNumber: null,
    status: "packing station",
    barcode: {
      value: uuidv4(),
      format: "CODE128",
      lastScanned: new Date()
    }
  }
];

async function createMockProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/storage");
    await Product.deleteMany({});

    for (const productData of mockProducts) {
      const product = new Product({
        ...productData,
        productNumber: uuidv4()
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
