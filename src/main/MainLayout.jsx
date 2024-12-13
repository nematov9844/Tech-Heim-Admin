import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Input } from "@mui/material";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function MainLayout() {
    const [isOpen, setIsOpen] = useState(true);
    const [searchText, setSearchText] = useState(""); // Qidiruv uchun state
    const navigate = useNavigate();
    const { path } = useParams();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value); // Qidiruv matnini yangilash
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Formani yuborishni oldini olish
        console.log("Qidiruv:", searchText);
        if (searchText) {
            navigate(`/home/all/${path}?query=${searchText}`); // Qidiruv matnini query parametr sifatida yuborish
        }
        setSearchText("")
    };

    return (
        <Box
            width={"100%"}
            display="flex"
            flexDirection="column"
            height="100vh"
            bgcolor="#F9FAFB" // Yengil fon rangi
        >
            <Box
                height="60px"
                bgcolor="#1E293B"
                color="#FFFFFF"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            >
                {/* Boshqaruv paneli */}
                <Box fontWeight="bold" display={"flex"} padding={"0 20px"} justifyContent={"space-between"} width={"100%"} fontSize="1.5rem">
                    <Button
                        onClick={() => setIsOpen((prevState) => !prevState)}
                        sx={{
                            marginLeft: 2,
                            color: "#FFFFFF",
                            border: "0px solid #FFFFFF",
                            "&:hover": { bgcolor: "#475569", border: "0px solid #475569" },
                        }}
                    >
                        <MenuIcon />
                    </Button>
                    <Box display="flex" alignItems="center">
                        <form onSubmit={handleSearchSubmit}>
                            <Input
                                placeholder="Search..."
                                value={searchText} // Qidiruv so‘zi
                                onChange={handleSearchChange} // Qidiruv so‘zini yangilash
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    borderRadius: 1,
                                    padding: "5px",
                                    width: "200px",
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginLeft: 2 }}
                                type="submit"
                            >
                                Search
                            </Button>
                        </form>
                    </Box>
                    Admin Panel
                </Box>
            </Box>

            <Box display="flex" flex="1" overflow="hidden">
                <Box
                    width={isOpen ? "20%" : "100px"}
                    bgcolor="#1E293B"
                    color="#FFFFFF"
                    boxShadow="2px 0px 4px rgba(0, 0, 0, 0.1)"
                    display="flex"
                    flexDirection="column"
                    padding={2}
                    sx={{
                        transition: "width 0.5s ease",
                    }}
                >
                    <Dashboard setIsOpen={setIsOpen} isOpen={isOpen} />
                </Box>

                <Box
                    width={isOpen ? "80%" : "100%"}
                    padding={3}
                    overflow="auto"
                    bgcolor={"rgba(30, 41, 59, 0.9)"}
                    boxShadow="inset 0px 0px 4px rgba(0, 0, 0, 0.1)"
                    sx={{
                        transition: "width 0.5s ease",
                    }}
                >
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
