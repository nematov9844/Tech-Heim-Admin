import { Routes, Route } from "react-router-dom";
import MainLayout from "../main/MainLayout";
import Category from "../pages/Category";
import LoginPage from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Root() {
    return (
        <>
            <Routes>
                <Route path="/home" element={<MainLayout />}>
                    {/* ProtectedRoute yordamida Category sahifasiga kirishga ruxsat berish */}
                    <Route path="all/:path" element={<ProtectedRoute element={<Category />} />} />
                    <Route path="profile" element={<ProtectedRoute element={<div>Profile Page</div>} />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
        </>
    );
}