// types/productTypes.ts

export interface ProductSize {
  size: string;
  stock: number;
  _id: string; // Changed to string to match the ObjectId format
}

export interface ProductItem {
  color: string;
  colorImageUrl: string;
  sizes: ProductSize[];
  _id: string; // Changed to string
}

export interface Product {
  _id: string; // Changed to string
  sellerId: string; // Changed to string
  name: string;
  gender: string;
  category: string;
  fabric: string;
  pattern: string;
  items: ProductItem[];
  description: string;
  price: number; // Changed to number
  totalStock: number; // Changed to number
  createdAt: string; // Changed to string to match date format
  updatedAt: string; // Changed to string to match date format
  __v: number;
}

// Define the types for the initial state
export interface ProductState {
  products: Product[]; // Array to store all products
  singleProduct: Product | null; // To store a single product data
  sellerProducts: Product[]; // Array to store products by a specific seller
  buyerPurchasedProducts: Product[];
  loading: boolean;
  error: string | null; // Allow both string and null types for error
}
