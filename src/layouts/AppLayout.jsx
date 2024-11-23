import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      {/* <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main> */}
      <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-zinc-900 mt-10">
        {" "}
        made with love by Protyay Mondal
      </div>
    </div>
  );
};

export default AppLayout;
