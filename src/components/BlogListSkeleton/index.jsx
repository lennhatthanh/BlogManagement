import React from "react";
import ContentLoader from "react-content-loader";

const BlogListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <ContentLoader
                        key={index}
                        speed={2}
                        width="100%"
                        height="auto"
                        viewBox="0 0 300 300"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#e0e0e0"
                        className="rounded-xl shadow-sm"
                    >
                        {/* Ảnh */}
                        <rect x="0" y="0" rx="10" ry="10" width="300" height="180" />
                        {/* Tag */}
                        <rect x="10" y="190" rx="6" ry="6" width="60" height="15" />
                        {/* Tiêu đề */}
                        <rect x="10" y="215" rx="6" ry="6" width="220" height="18" />
                        {/* Mô tả ngắn */}
                        <rect x="10" y="240" rx="6" ry="6" width="260" height="14" />
                        <rect x="10" y="260" rx="6" ry="6" width="200" height="14" />
                    </ContentLoader>
                ))}
        </div>
    );
};

export default BlogListSkeleton;
