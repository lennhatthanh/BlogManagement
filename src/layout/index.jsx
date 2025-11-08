import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return <div className="min-h-screen">
        <Header/>
        <div className="grid gap-6 px-5 mx-auto max-w-7xl my-20 min-h-[60vh]">
            <Outlet />
        </div>
        <Footer/>
    </div>;
}
