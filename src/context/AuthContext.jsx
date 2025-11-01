import { getMe, login } from "@/services/api/user";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || {});
    const [role, setRole] = useState(userInfo?.user?.role);
    useEffect(() => {
        setRole(userInfo?.user?.role || null)
    }, [userInfo])
    const logoutAccount = () => {
        setUserInfo(localStorage.removeItem("userInfo"))
    };
    const loginUser = async (payload) => {
        try {
            const res = await login(payload);
            if (res.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify({ ...res.data }));
                try {
                    const me = await getMe();
                    console.log(me);

                    if (me.status === 200) {
                        setUserInfo({ ...res.data, ...me.data });
                        setRole(res.data);
                        localStorage.setItem("userInfo", JSON.stringify({ ...res.data, ...me.data }));
                    }
                } catch (error) {
                    toast(error.response?.data?.message || "Login failed");
                }
            }
        } catch (error) {
            toast(error.response?.data?.message || "Login failed");
        }
    };
    return <AuthContext.Provider value={{ userInfo, loginUser, setUserInfo, role, logoutAccount }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
