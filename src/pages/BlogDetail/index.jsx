import { getBlog } from "@/services/api/blog";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlogs] = useState({});
    useEffect(() => {
        getBlogDetail();
    }, []);
    const getBlogDetail = async () => {
        const res = await getBlog(id);
        setBlogs(res.data);
    };
    return (
        <div>
            <div className="text-center">
                <p className="text-primary font-medium">Published on October 3, 2025</p>
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto! py-4">{blog.title}</h1>
                <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
                    {blog.author?.username}
                </p>
            </div>
            <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
                <img
                    alt=""
                    className="rounded-3xl mb-5 mx-auto"
                    src={blog.image}
                />
            </div>
            <div className="blog-details rich-text max-w-3xl mx-auto px-4 text-left text-foreground" dangerouslySetInnerHTML={{ __html: blog.content }} >
            </div>
        </div>
    );
}
