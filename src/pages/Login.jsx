import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState(""); // Username uchun state
    const [password, setPassword] = useState(""); // Password uchun state
    const [error, setError] = useState(""); // Xato xabarini saqlash
    const navigate = useNavigate(); // Sahifalar o'rtasida navigatsiya qilish

    const handleSubmit = (event) => {
        event.preventDefault();

        // Username va passwordni tekshirish
        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAuthenticated", "true"); // Foydalanuvchi login bo'lsa, localStorage ga saqlash
            navigate("/home"); // Muvaffaqiyatli login bo'lsa, Category sahifasiga yo'naltirish
        } else {
            setError("Username yoki password noto'g'ri!"); // Xato bo'lsa, xabar ko'rsatish
        }
    };

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#F9FAFB"
        >
            <Box
                width="400px"
                padding={3}
                bgcolor="#FFFFFF"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                borderRadius="8px"
            >
                <Typography variant="h5" align="center" marginBottom={2}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" align="center" marginTop={2}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
