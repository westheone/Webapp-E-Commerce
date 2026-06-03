"use client";

import { useState, useEffect } from "react";
import type { Product } from "../types/product";

export default function AdminPage() {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data safely on the client side
  useEffect(() => {
    const localData = localStorage.getItem("ecommerce_inventory");

    if (localData) {
      setInventory(JSON.parse(localData));
    }
    setIsLoading(false);
  }, []);

  const lowOrOutOfStockInventory = inventory.filter((product) => {
    const isOutOfStock = product.stockCount === 0;
    const isLowStock = product.stockCount > 0 && product.stockCount <= 3;

    return isOutOfStock || isLowStock;
  });

  


  const categoryOverview = inventory.reduce((acc, product) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = {
        totalStock: 0,
        uniqueItems: 0,
      };
    }
    acc[category].totalStock += product.stockCount;
    acc[category].uniqueItems += 1;

    return acc;
  }, {} as Record<string, { totalStock: number; uniqueItems: number }>);



  if (isLoading) {
    return <div className="loading-text" >Loading...</div>;
  }


  return (
    <div>
      <header className="header-box">  
        <div>
        <h1 className="select-header">Admin Dashboard</h1>
        <p className="select-subheader">Manage your inventory and view sales data</p>
        </div>

        <div>
          <h2>Total Stock Count: {inventory.reduce((total, product) => total + product.stockCount, 0)}</h2>
          <h2>Total Value: ${inventory.reduce((total, product) => total + product.stockCount * product.price, 0).toFixed(2)}</h2>
        </div>

      </header> 

      <div className="page-container">
        
        <div className= "admin-grid">

          {/* Low/Out of Stock Items Section */}
          <div className="admin-card">
            <h2 className="admin-card-title">Low/Out of Stock Items</h2>
            {lowOrOutOfStockInventory.map((product) => {

            return (
              <div key={product.id} className="admin-item">
                <h2>{product.name}</h2>
                <p>Stock Count: {product.stockCount}</p>
              </div>
            );
            })}
          </div>

          <div className="admin-card">
            <h2 className="admin-card-title">Category Overview</h2>
            {Object.entries(categoryOverview).map(([category, stats]) => (
              <div key={category} className="admin-item">
                <h2>{category}</h2>
                <p>Items: {stats.uniqueItems}</p>
                <p>Stock Count: {stats.totalStock}</p>
              </div>
            ))}

          </div>

          {/* Inventory Overview Section, needs to be moved to its own page
          <div className="admin-card">
            <h2 className="admin-card-title">Inventory Overview</h2>
            {inventory.map((product) => {
              return (
                <div key={product.id} className="admin-item">
                  <h2>{product.name}</h2>
                  <p>Stock Count: {product.stockCount}</p>
                </div>
              );
            })}
          </div>
          */}



        </div>
      </div>
    </div>




  );
}
   