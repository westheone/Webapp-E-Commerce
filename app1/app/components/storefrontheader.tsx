"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



 export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Cart", href: "/storefront/cart" },
    { name: "Home", href: "/storefront" }
  ];

  return (
  <header className= "header-box justify-between"> 
    
    <h1 className="section-title">Storefront.com</h1>

    <div className="navbar">
      {navLinks.map((link) => (
          <button key={link.href} className="button-look">
            <Link href={link.href}>
              <span aria-current={pathname === link.href ? "page" : undefined}>
                {link.name}
              </span>
            </Link>
          </button>
        ))}

    </div>
    </header>
    );
}