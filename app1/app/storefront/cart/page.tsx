"use client";

import  {useState, useEffect }  from "react";
import type { Product } from "../../types/product";



export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localCartData = localStorage.getItem("ecommerce_cart");

    if (localCartData) {
      setCart(JSON.parse(localCartData));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-text">
        Loading Cart inventory...
      </div>
    );
  }

  const handleDelete = (productId: number | undefined) => {
    if (productId === undefined) return; // Safety check for undefined cartid
    const updatedCart = cart.filter((product) => product.cartid !== productId);
    const deletedProduct = cart.find((product) => product.cartid === productId);

      if (deletedProduct) {
        // Increment the stock count in inventory
        const inventoryData = localStorage.getItem("ecommerce_inventory");
        if (inventoryData) {
          const inventory = JSON.parse(inventoryData);
          const updatedInventory = inventory.map((product: Product) => {
            if (product.id === deletedProduct.id) {
              return { ...product, stockCount: product.stockCount + 1 };
            }
            return product;
          });
          localStorage.setItem("ecommerce_inventory", JSON.stringify(updatedInventory));
        }
      }
    // Update React State (triggers DOM Manipulation update)
    setCart(updatedCart);
    localStorage.setItem("ecommerce_cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2).toString();
  const totalItems = cart.length.toString();



  return (
    <div>
      {/* Page Header Headers */}

      <header className="mb-1">
        <h1 className="section-title">Your Cart</h1>
        <p className="section-subtitle">Your cart currently has {""} 
          <span className="font-bold text-lg"> {totalItems} </span>
          items and a total price of ${""}
          <span className= "font-bold text-lg"> {totalPrice} </span>
        </p>
      </header>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((product,index) => {
          return (
            <div key={index} className="product-card">
              <h2 className="product-title">{product.name}</h2>
              <p className="pricing-display">${product.price.toFixed(2)}</p>
              <button className= "delete-button" onClick={() => handleDelete(product.cartid)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>


    </div>
  );
}