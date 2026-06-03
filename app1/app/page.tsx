"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  
  // A quick array to map out our navigation links cleanly
  const navLinks = [
    { name: "Storefront", href: "/storefront" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  return (
    <main>
      <div className="flex flex-row gap-4 sticky top-0 justify-center ">
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
    </main>
  );
}


