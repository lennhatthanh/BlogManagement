import api from ".";

export const login = async (payload) => {
    return await api.post("/auth/login", payload);
};

export const signup = async (payload) => {
    return await api.post("/auth/register", payload);
};

export const getMe = async () => {
    return await api.get("/auth/me");
}

export const getUsers = async () => {
    return await api.get("/users");
}

export const setRoleUser = async (id, role) => {
    return await api.put(`/users/${id}/role`, role);
}

export const deleteUser = async (payload) => {
    return await api.delete(`/users/${payload}`);
};
