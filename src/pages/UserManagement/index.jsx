import React, { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconKey, IconTrashX } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { deleteBlog, getBlogs } from "@/services/api/blog";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers, setRoleUser } from "@/services/api/user";
import DialogChangeRole from "@/components/DialogChangeRole";
import { DialogDeleteBlog } from "@/components/DialogDeleteBlog";
export default function UserManagement() {
    useEffect(() => {
        fetchMyPost();
    }, []);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user");
    const fetchMyPost = async () => {
        try {
            setLoading(true);
            const result = await getUsers();
            console.log(result);
            setUsers(result.data.items);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    const handleOpenDialogChangeRole = (value) => {
        setOpen(true);
        setUser(value);
    };
    const handleOpenDialogDelete = (value) => {
        setOpenDelete(true);
        setUser(value);
    };
    const handleDeleteBlog = async () => {
        try {
            const result = await deleteUser(user._id);
            if (result.status === 200) {
                toast.success("Xóa thành công!");
                setUsers(users.filter((item) => item._id !== user._id));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setUser(null);
        }
    };

    const handleSetRole = async () => {
        try {
            if (!role) {
                return;
            }
            const result = await setRoleUser(user._id.trim(), { role });
            if (result.status === 200) {
                toast.success("Đổi role thành công!");
                setUsers(users.map((item) => (item._id === user._id ? { ...user, role: role } : item)));
            }
        } catch (error) {
            console.log(user._id, { role });

            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <div className="overflow-auto">
            <h2 className="hero-title text-3xl sm:text-5xl font-semibold sm:leading-[4rem] text-primary text-center mt-10 mb-8">
                ✍️ User Management
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>USERNAME</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead className="text-center lg:text-start">ROLE</TableHead>
                        <TableHead className="text-center lg:text-start">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow className="w-full">
                            <TableCell className="h-full" colSpan={4}>
                                <div className="min-h-[400px] w-full flex justify-center items-center">
                                    <Spinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : users?.length === 0 ? (
                        <TableRow className="w-full">
                            <TableCell className="h-full" colSpan={4}>
                                <div className="min-h-[400px] w-full flex justify-center items-center">
                                    You have no posts yet.
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users?.map((invoice) => (
                            <TableRow key={invoice._id}>
                                <TableCell>{invoice.username}</TableCell>
                                <TableCell className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[500px]">
                                    {invoice.email}
                                </TableCell>
                                <TableCell className="">
                                    <span className="rounded-2xl border border-border px-2 py-1 text-xs">
                                        {invoice.role}
                                    </span>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => handleOpenDialogDelete(invoice)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    <IconTrashX stroke={2} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete this post</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => handleOpenDialogChangeRole(invoice)}
                                                    className="bg-primary/10 text-primary px-2 py-1 rounded-md"
                                                >
                                                    <IconKey stroke={2} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>View this post</TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <DialogChangeRole
                open={open}
                setOpen={setOpen}
                handleSetRole={handleSetRole}
                setRole={setRole}
                role={role}
            />
            <DialogDeleteBlog
                open={openDelete}
                setOpen={setOpenDelete}
                title={user?.username}
                handleClick={handleDeleteBlog}
            />
        </div>
    );
}
