import React from "react";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>

        <div className="flex flex-col md:flex-row gap-8">

    
          <section className="flex-1">
            {children}
          </section>
        </div>
        </div>

  );
}