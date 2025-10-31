import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/" element={<Layout/>}>
                    <Route index path="" element={<Home />}/>
                    <Route path="blog-detail/:id" element={<BlogDetail />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
