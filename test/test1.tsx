"use server";

interface ProductData {
  name: string;
  categoryName: string;
  price: number;
  stockCount: number;
}

export async function addProduct(data: ProductData) {
  try {
    // Save to database here (Prisma, MongoDB, etc.)
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error("Failed to add product");
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

"use client";
import React, { useRef } from "react";
import { addProduct } from "@/app/actions/products"; // Server action

interface AddStockProps {
  name: string;
  setName: (term: string) => void;
  categoryName: string;
  setCategoryName: (term: string) => void;
  price: number;
  setPrice: (value: number) => void;
  stockCount: number;
  setStockCount: (value: number) => void;
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

  const handleSubmit = async (formData: FormData) => {
    await addProduct({
      name: formData.get("productName") as string,
      categoryName: formData.get("productCategory") as string,
      price: Number(formData.get("productPrice")),
      stockCount: Number(formData.get("productStock")),
    });
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <label htmlFor="productName" className="section-title">Product name</label>
      <input id="productName" name="productName" type="text" placeholder="Name of product..." required />

      <label htmlFor="productCategory" className="section-title">Category</label>
      <input id="productCategory" name="productCategory" type="text" placeholder="Name of category..." required />

      <label htmlFor="productPrice" className="section-title">Price per unit</label>
      <input id="productPrice" name="productPrice" type="number" placeholder="$1, 5, 10..." required />

      <label htmlFor="productStock" className="section-title">Total stock count</label>
      <input id="productStock" name="productStock" type="number" placeholder="10, 20, 30..." required />

      <button type="submit" className="button-look">Add +</button>
    </form>
  );
}