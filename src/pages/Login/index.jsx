import React, { useContext, useState } from "react";
import AnimatedWave from "@/components/lightswind/animated-wave";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/api/user";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            setLoading(true);
            await loginUser({ email, password });
            toast.success("Login compelete!");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative h-screen w-screen flex items-center justify-center">
            <AnimatedWave className="absolute" />
            <Card className="w-full max-w-sm z-10">
                <CardHeader>
                    <img src={logo} className="mx-auto w-15 h-15" alt="" />
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-4">
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    className="placeholder:text-gray-400"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    className="placeholder:text-gray-400"
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleLogin} className="bg-primary w-full hover:bg-primary/85">
                        Login
                    </Button>
                    <Label className="text-sm text-gray-500 mt-4 font-normal">
                        Dont have an account?{" "}
                        <Link to="/signup" className="text-primary">
                            Signup
                        </Link>
                    </Label>
                </CardFooter>
            </Card>
        </div>
    );
}
