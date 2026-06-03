"use client";

import Link from "next/link";



export default function Header() {


 


  // A quick array to map out our navigation links cleanly

  return (
    <header className="header">
      <div className="header-box">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="picked-text"
          >
            📦 InventoryEngine
          </Link>
        </div>

        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="inline-flex items-center rounded-md bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-700">
            v1.0 Local Prototype
          </span>
        </div>

      </div>
    </header>
  );
}

