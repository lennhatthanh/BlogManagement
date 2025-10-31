import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { DropdownMenuClient } from "../DropdownMenuClient";
export default function Header() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const handleTheme = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };
    useEffect(() => {
        theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <div className="container mx-auto p-4 fixed top-0 bg-background z-100 right-0 left-0">
            <div className="flex items-center justify-between md:px-16 lg:px-24 xl:px-32">
                <Link to="/">
                    <img src={logo} alt="" className="max-w-12" />
                </Link>
                <div className="flex gap-2">
                    <Link>
                        <Button className="bg-[#5044e5] w-full hover:bg-[#5044e5]/85 text-white"> + Create Blog</Button>
                    </Link>
                    {theme === "light" ? (
                        <Button onClick={handleTheme} className="bg-accent text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="tabler-icon tabler-icon-moon"
                            >
                                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                            </svg>
                        </Button>
                    ) : (
                        <Button onClick={handleTheme} className="bg-accent text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-brightness-down"
                            >
                                <path d="M0 0h24v24H0z" stroke="none" fill="none"></path>
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M12 5l0 .01"></path>
                                <path d="M17 7l0 .01"></path>
                                <path d="M19 12l0 .01"></path>
                                <path d="M17 17l0 .01"></path>
                                <path d="M12 19l0 .01"></path>
                                <path d="M7 17l0 .01"></path>
                                <path d="M5 12l0 .01"></path>
                                <path d="M7 7l0 .01"></path>
                            </svg>
                        </Button>
                    )}
                    <DropdownMenuClient />
                </div>
            </div>
        </div>
    );
}
