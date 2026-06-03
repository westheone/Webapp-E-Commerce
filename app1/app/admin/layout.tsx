import React from "react";
import Sidebar from "../components/adminside";


export default function AdminddashboadLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar/>
          <section className="flex-1">
            {children}
          </section>
       </div>
    </div>
  );
}