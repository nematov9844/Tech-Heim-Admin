import { Navigate } from "react-router-dom";

// ProtectedRoute komponenti login bo'lmagan foydalanuvchilarni login sahifasiga yo'naltiradi
export default function ProtectedRoute({ element }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Login bo'lsa, localStorage'da ma'lumot borligini tekshirish
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return element;
}
