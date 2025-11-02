import { getMe, login, signup } from "@/services/api/user";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
    const [role, setRole] = useState(userInfo?.user?.role);
    const navigate = useNavigate();
    useEffect(() => {
        setRole(userInfo?.user?.role || null);
    }, [userInfo]);
    const logoutAccount = () => {
        setUserInfo(localStorage.removeItem("userInfo") || null);
    };
    const loginUser = async (payload) => {
        try {
            const res = await login(payload);
            if (res.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify({ ...res.data }));
                try {
                    const me = await getMe();
                    if (me.status === 200) {
                        setUserInfo({ ...res.data, ...me.data });
                        setRole(res.data);
                        toast.success("Login compelete!");
                        localStorage.setItem("userInfo", JSON.stringify({ ...res.data, ...me.data }));
                        navigate("/");
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "Login failed");
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };
    const signUpUser = async (payload) => {
        try {
            await signup(payload);
            toast.success("Register successful")
            await loginUser({email: payload.email, password: payload.password});
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign Up failed");
        }
    };
    return (
        <AuthContext.Provider value={{ userInfo, loginUser, signUpUser, setUserInfo, role, logoutAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
