"use client";

import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import SearchBar from "../components/seachbar";


const defaultInventory: Product[] = [
  { id: 1, name: "Premium Wireless Headphones", category: "Electronics", price: 129.99, stockCount: 15, cartid: undefined },
  { id: 2, name: "Ergonomic Office Chair", category: "Furniture", price: 249.99, stockCount: 3, cartid: undefined },
  { id: 3, name: "Stainless Steel Water Bottle", category: "Fitness", price: 24.99, stockCount: 0, cartid: undefined  },
  { id: 4, name: "Smart LED Desk Lamp", category: "Electronics", price: 59.99, stockCount: 8, cartid: undefined  },
  { id: 5, name: "Memory Foam Pillow", category: "Furniture", price: 39.99, stockCount: 12, cartid: undefined },
  { id: 6, name: "Yoga Mat with Carrying Strap", category: "Fitness", price: 29.99, stockCount: 5, cartid: undefined },
  { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 89.99, stockCount: 2, cartid: undefined },
  { id: 8, name: "Adjustable Standing Desk Converter", category: "Furniture", price: 199.99, stockCount: 4, cartid: undefined },
  { id: 9, name: "Resistance Bands Set", category: "Fitness", price: 19.99, stockCount: 20, cartid: undefined },
  { id: 10, name: "4K Ultra HD Action Camera", category: "Electronics", price: 149.99, stockCount: 7, cartid: undefined },
];

const cartInventory: Product[] = [];

export default function StorefrontPage() {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");


  // 1. Load data safely on the client side
  useEffect(() => {
    const localData = localStorage.getItem("ecommerce_inventory");
    const localCartData = localStorage.getItem("ecommerce_cart");
  // load from localStorage if it exists, otherwise initialize with default data and save to localStorage for persistence
    if (localData) {
      setInventory(JSON.parse(localData));
    } else {
      setInventory(defaultInventory);
      localStorage.setItem("ecommerce_inventory", JSON.stringify(defaultInventory));
    }
  // Same logic for cart data
    if (localCartData) {
      setCart(JSON.parse(localCartData));
    }else {
      setCart(cartInventory);
      localStorage.setItem("ecommerce_cart", JSON.stringify(cartInventory));
    }
    setIsLoading(false);
  }, []);

  // 2. Handle the simulated checkout transaction
  const handlePurchase = (productId: number) => {
    // Map through the array, find the item, and decrement its stock mathematically
    const updatedInventory = inventory.map((product) => {
      if (product.id === productId && product.stockCount > 0) {
        return { ...product, stockCount: product.stockCount - 1 }; 
      }
  
      return product;

    });
    // Find the purchased product details to add to cart
    const purchasedProduct = inventory.find((product) => product.id === productId);
    if (purchasedProduct) {
      setCart([...cart, { ...purchasedProduct, cartid: Date.now() }]);
    }

    // Update React State (triggers DOM Manipulation update)
    setInventory(updatedInventory);
    
    
    // Sync to Browser Storage (triggers State Persistence)
    localStorage.setItem("ecommerce_inventory", JSON.stringify(updatedInventory));
    localStorage.setItem("ecommerce_cart", JSON.stringify([...cart, { ...purchasedProduct,}]));
  };


  const filteredInventory = inventory.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesName || matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="loading-text">
        Loading inventory dataset...
      </div>
    );
  }

  return (
    <div className="page-container"> 
      <div>
        {/* Page Header Headers */}
        <header className="mb-1 ">
          <h1 className="section-title">Available Products</h1>
          <p className="section-subtitle">
            See all currently available items
          </p>
        </header>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Product Display Grid layout */}
        <div className="grid-container">
    
          {filteredInventory.map((product) => {
            const isOutOfStock = product.stockCount === 0;
            const isLowStock = product.stockCount > 0 && product.stockCount <= 3;


            return (
              
              <div

              
                key={product.id}
                className="product-card">

                <div>
                  {/* Category tag */}
                  <span className="category-tag">
                    {product.category}
                  </span>
                  
                  {/* Product title */}
                  <h2 className="product-title">{product.name}</h2>
                  
                  {/* Pricing display */}
                  <p className="pricing-display">${product.price.toFixed(2)}</p>
                  
                  {/* Conditional Badge Logic for Stock Status */}
                  <div className="flex items-center">
                    {isOutOfStock ? (
                      <span className="outofstock-text">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="lowstock-text">
                        Only {product.stockCount} left!
                      </span>
                    ) : (
                      <span className="instock-text">
                        In Stock: {product.stockCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Purchase Button Trigger */}
                <div className="mt-6">
                  <button
                    onClick={() => handlePurchase(product.id)}
                    disabled={isOutOfStock}
                    className={`button-look ${
                      isOutOfStock
                        ? "button-look cursor-not-allowed opacity-50"
                        : "button-look"
                    }`}
                  >
                    {isOutOfStock ? "Sold Out" : "Purchase Item"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}