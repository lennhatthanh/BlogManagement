import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                    <Route path="/" element={<Layout />}>
                        <Route index path="" element={<Home />} />
                        <Route path="blog-detail/:id" element={<BlogDetail />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
