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