import React from "react";
import Header from "../components/storefrontheader";
import Sidebar from "../components/storefrontsidebar";


export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
    <Header />
    <div className="flex flex-col md:flex-row gap-8">
      <Sidebar/>
      <section className="flex-1">
        {children}
      </section>
    </div>
    </div>
  );
}