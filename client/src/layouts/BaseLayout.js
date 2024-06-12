import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BaseLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="mx-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
