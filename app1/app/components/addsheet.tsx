"use client";
import React, { useEffect, useRef } from "react";
import type { Product } from "../types/product";


interface AddStockProps{
  name: string;
  setName: (trem: string) => void;

  categoryName: string;
  setCategoryName: (trem: string) => void;

  price: number;
  setPrice: (trem: number) => void;

  stockCount: number;
  setStockCount: (trem: number) => void;
}




export default function AddStock({
  name,
  setName,
  categoryName,
  setCategoryName,
  price,
  setPrice,
  stockCount,
  setStockCount,
}: AddStockProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      // Update state with form values
      setName(name);
      setCategoryName(categoryName);
      setPrice(price);
      setStockCount(stockCount);
      // Reset form
      form.reset();
    };

    form.addEventListener("submit", handleSubmit as EventListener);
    return () => form.removeEventListener("submit", handleSubmit as EventListener);
  }, [name, categoryName, price, stockCount, setName, setCategoryName, setPrice, setStockCount]);

  return (
    <form id="addForm" ref={formRef}>
      <label htmlFor="productName" className="section-title">Product name</label>
      <input
        id="productName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of product..."
      />

      <label htmlFor="productCategory" className="section-title">Category</label>
      <input
        id="productCategory"
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Name of category..."
      />

      <label htmlFor="productPrice" className="section-title">Price per unit</label>
      <input
        id="productPrice"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="$1, 5, 10..."
      />

      <label htmlFor="productStock" className="section-title">Total stock count</label>
      <input
        id="productStock"
        type="number"
        value={stockCount}
        onChange={(e) => setStockCount(Number(e.target.value))}
        placeholder="10, 20, 30..."
      />

      <button type="submit" className="button-look" sticky-bottom sticky-right>
        Add +
      </button>
    </form>
  );
}