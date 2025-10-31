import React from "react";
import AnimatedWave from "@/components/lightswind/animated-wave";
import "@/components/lightswind.css";
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
import { Link } from "react-router-dom";
export default function Login() {
    return (
        <div className="relative h-screen w-screen flex items-center justify-center">
            <AnimatedWave className="absolute" />
            <Card className="w-full max-w-sm z-10">
                <CardHeader>
                    <img src={logo} className="mx-auto w-15 h-15" alt="" />
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-4">
                                <Input
                                    id="email"
                                    className="placeholder:text-gray-400"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Input
                                    id="password"
                                    className="placeholder:text-gray-400"
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="bg-[#5044e5] w-full hover:bg-[#5044e5]/85">
                        Login
                    </Button>
                    <Label className="text-sm text-gray-500 mt-4 font-normal">
                        Dont have an account? <Link to="/signup" className="text-[#5044e5]">Signup</Link>
                    </Label>
                </CardFooter>
            </Card>
        </div>
    );
}
