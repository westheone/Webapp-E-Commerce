"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // A quick array to map out our navigation links cleanly
  const categories = [
    { name: "All Products", href: "/storefront/all-products" },
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