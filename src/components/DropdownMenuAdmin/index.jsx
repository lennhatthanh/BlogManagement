import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function DropdownMenuAdmin({ handleLogout }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
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
                        class="lucide lucide-user"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    <Link to="/my-post" className="flex gap-2">
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
                            class="tabler-icon tabler-icon-clipboard-list w-4 h-4 text-[#6b7280] group-hover:text-white"
                        >
                            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 12l.01 0"></path>
                            <path d="M13 12l2 0"></path>
                            <path d="M9 16l.01 0"></path>
                            <path d="M13 16l2 0"></path>
                        </svg>
                        My Posts
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/user-management" className="flex gap-2">
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
                            class="tabler-icon tabler-icon-user-scan w-4 h-4 text-[#6b7280] group-hover:text-white"
                        >
                            <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                            <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                            <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                            <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"></path>
                        </svg>
                        User Management
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/login" onClick={handleLogout} className="flex gap-2">
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
                            class="tabler-icon tabler-icon-logout w-4 h-4 text-[#6b7280] group-hover:text-white"
                        >
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M9 12h12l-3 -3"></path>
                            <path d="M18 15l3 -3"></path>
                        </svg>
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
