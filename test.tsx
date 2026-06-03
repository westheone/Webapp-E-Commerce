"use client";
// SideBar work
interface SidebarProps {
  onCategoryClick: (category: string) => void;
}

  function handleCategoryClick(category: string) {
    const filteredInventory = inventory.filter((product) => {
      const matchesCategory = product.category.toLowerCase().includes(category.toLowerCase());
        return matchesCategory;
    }
      //product.category === category);
    
    );
  }

export default function Sidebar({ onCategoryClick }: SidebarProps) {

  // A quick array to map out the category buttons, this could be dynamic in a more complex app
  const categories = [
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Fitness"},
  ];

  return ( 
  

    <aside className="sidebar">
      <nav className="flex flex-col gap-4">
        {categories.map((category) => {
          // In a more complex app, we could also add logic here to show the number of items in each category, or disable categories with no stock
          return (
           <button key={category.name} className="button-look" onClick={() => onCategoryClick(category.name)}>
             {category.name}
           </button>
          );
        })}
      </nav>
    </aside>
  );
}



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // A quick array to map out our navigation links cleanly
  const categories = [
    { name: "Electronics", href: "/storefront/electronics" },
    { name: "Furniture", href: "/storefront/furniture" },
    { name: "Fitness", href: "/storefront/fitness" },
  ];

  return ( 
    <aside className="sidebar">
      <nav className="flex flex-col gap-4">
        {categories.map((link) => {
          // Check if the current URL path matches this link
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg p-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// AddForm work
"use client";

import type { Product } from "../types/product";


interface AddStockProps{
  name: string;
  setName: (trem: string) => void;

  categoryName: string;
  setCategoryName: (trem: string) => void;

  price: number;
  setPrice: (trem: number) => 0;

  stockCount: number;
  setStockCount: (trem: number) => 0;
}




export default function AddStock ({name, setName, categoryName, setCategoryName, price, setPrice, stockCount, setStockCount}: AddStockProps) {
  const form = document.getElementById("addForm");
  form.addEventListener("submit", function(event){
  
});



  return(
    <form id="addForm">
      <label id="productName" className="section-title">Product name</label>
      <input id="productName" type="" value="" placeholder="Name of product..." />

      <label id="productCategory" className="section-title">Category</label>
      <input id="productCategory" type='text' value="" placeholder="Name of category..."/>

      <label id="productPrice" className="section-title">Price per uint</label>
      <input id="productPrice" type='number' value="0" placeholder="$1, 5, 10..."/>

      <label id="productStock" className="section-title">Total stock count</label>
      <input id="productStock" type='number' value="0" placeholder="10, 20, 30..."/>

      <button type="submit" className="button-look" sticky-bottom sticky-right>Add +</button>

    </form>

    // <div>

    //   <h2 className="section-title">Product name</h2>
    //   <input type="" placeholder="Name of product..."/> 
    //   <h2 className="section-title">Category</h2>
    //   <input type='text' placeholder="Name of category..."/>
    //   <h2 className="section-title">Price per uint</h2>
    //   <input type='text' placeholder="Price of product..."/>
    //   <h2 className="section-title">Total stock count</h2>
    //   <input type='text' placeholder="Stock of product..."/>

    //   <button className="button-look" sticky-bottom sticky-right>Add +</button>
    // </div>
  )

}
