import LoadingBlogDetail from "@/components/LoadingBlogDetail";
import { Spinner } from "@/components/ui/spinner";
import { getBlog } from "@/services/api/blog";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlogs] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        getBlogDetail();
    }, []);
    const getBlogDetail = async () => {
        try {
            setLoading(true);
            const res = await getBlog(id);
            setBlogs(res.data);
        } catch (error) {
            toast.success(error?.response?.data?.message);
            navigate("/")
        }
        setLoading(false);
    };
    const date = new Date(blog.updatedAt);

    const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <div className="w-full">
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <p className="text-primary font-medium">Published on {formatted}</p>
                        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto! py-4">{blog.title}</h1>
                        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
                            {blog.author?.username}
                        </p>
                    </div>
                    <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
                        <img alt="" className="rounded-3xl mb-5 mx-auto" src={blog.image} />
                    </div>
                    <div
                        className="blog-details rich-text max-w-3xl mx-auto px-4 text-left text-foreground"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </>
            )}
        </div>
    );
}
