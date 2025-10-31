import React from "react";
import { useNavigate } from "react-router-dom";

export default function BlogList({ blogs }) {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        console.log(id);
        navigate(`/blog-detail/${id}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((item) => (
                <div onClick={() => handleNavigate(item._id)} key={item._id}>
                    <div className="grid h-full cursor-pointer" data-discover="true">
                        <div className="shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
                            <img alt={item.title} className="w-full h-48 object-cover" src={item.image} />
                            <div className="p-4 bg-card">
                                <div className="flex gap-2 mb-2">
                                    {item.tags.map((value, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden border-transparent bg-[#dcdafa] text-primary rounded-full"
                                        >
                                            {value}
                                        </span>
                                    ))}
                                </div>
                                <h5 className="text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
                                    {item.title}
                                </h5>
                                <p className="text-foreground mb-2 text-xs">
                                    I've been a Cursor power user for over a year. I wrote the guide to Cursor tips that
                                    thousands of d...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
