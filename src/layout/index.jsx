import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return <div className="min-h-screen">
        <Header/>
        <div className="grid gap-6 mx-5 max-w-7xl md:mx-auto my-10 mt-20 mb-6 min-h-[60vh]">
            <Outlet />
        </div>
        <Footer/>
    </div>;
}
