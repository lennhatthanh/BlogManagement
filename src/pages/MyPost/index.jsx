import React, { useContext, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IconBinoculars, IconTrashX } from "@tabler/icons-react";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDeleteBlog } from "@/components/DialogDeleteBlog";
import { deleteBlog, getBlogs } from "@/services/api/blog";
import { Link, useNavigate } from "react-router-dom";
import { cleanHTMT } from "@/until/cleanHtml";
export default function MyPost() {
    useEffect(() => {
        fetchMyPost();
    }, []);
    const { userInfo } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const fetchMyPost = async () => {
        try {
            setLoading(true);
            const result = await getBlogs();
            setBlogs(result.data.items.filter((item) => item.author._id == userInfo.user.id));
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    const handleOpenDialogDelete = (value) => {
        setOpen(true);
        setBlog(value);
    };
    const handleDeleteBlog = async () => {
        debugger
        try {
            const result = await deleteBlog(blog._id);
            if (result.status === 200) {
                toast.success("Xóa thành công!");
                setBlogs(setBlogs(blogs.filter((item) => item._id !== blog._id)));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setBlog(null);
        }
    };
    return (
        <div className="overflow-auto">
            <h2 className="hero-title text-3xl sm:text-5xl font-semibold sm:leading-[4rem] text-primary text-center mt-10 mb-8">
                ✍️ My Post
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>TITLE</TableHead>
                        <TableHead>CONTENT</TableHead>
                        <TableHead className="text-center lg:text-start">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow className="w-full">
                            <TableCell className="h-full" colspan={3}>
                                <div className="min-h-[400px] w-full flex justify-center items-center">
                                    <Spinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : blogs.length === 0 ? (
                        <TableRow className="w-full">
                            <TableCell className="h-full" colspan={3}>
                                <div className="min-h-[400px] w-full flex justify-center items-center">
                                    You have no posts yet.
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        blogs?.map((invoice) => (
                            <TableRow key={invoice._id}>
                                <TableCell>{invoice.title}</TableCell>
                                <TableCell className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[500px]">{cleanHTMT(invoice.content)}</TableCell>
                                <TableCell className="">
                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link to={`/blog-details/${invoice._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md">
                                                    <IconBinoculars stroke={2} />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>View this post</TooltipContent>
                                        </Tooltip>
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
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <DialogDeleteBlog open={open} setOpen={setOpen} title={blog?.title} handleClick={handleDeleteBlog} />
        </div>
    );
}
