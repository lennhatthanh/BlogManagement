import api from "./index";

export const getBlogs = async () => {
    return await api.get("https://api-blog-af3u.onrender.com/api/posts?page=1&limit=10");
};

export const getBlog = async (id) => {
    return await api.get(`https://api-blog-af3u.onrender.com/api/posts/${id}`);
};
