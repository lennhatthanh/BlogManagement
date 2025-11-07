import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import UserManagement from "./pages/UserManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
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
                        <Route
                            path="user-management"
                            element={
                                <ProtectedRoute role="admin">
                                    <UserManagement />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="blog-details/:id" element={<BlogDetail />} />
                        <Route
                            path="create-blog"
                            element={
                                <ProtectedRoute role="user admin">
                                    <CreateBlog />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AuthContextProvider>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
