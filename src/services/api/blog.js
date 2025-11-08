import api from "./index";

export const getBlogs = async () => {
    return await api.get("/posts");
};

export const getBlog = async (id) => {
    return await api.get(`/posts/${id}`);
};

export const createBlog = async (payload) => {
    return await api.post(`/posts`, payload);
};

export const deleteBlog = async (payload) => {
    return await api.delete(`/posts/${payload}`);
};
