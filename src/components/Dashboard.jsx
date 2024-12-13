import { Box, List, ListItem, ListItemText, Typography, ListItemIcon, Button } from "@mui/material";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";

const categoryIcons = {
    accessories: <HeadphonesIcon fontSize="20px" />,
    camera: <CameraAltIcon fontSize="20px" />,
    laptop: <LaptopMacIcon fontSize="20px" />,
    smartphone: <SmartphoneIcon fontSize="20px" />,
    gaming: <SportsEsportsIcon fontSize="20px" />,
};

export default function Dashboard({ isOpen}) {
    const { getData } = useAxios();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData("category");
                setPages(data);
            } catch (error) {
                console.error("Failed to fetch data:", error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <Box
            height="100vh"
            width="100%"
            bgcolor="#1E293B"
            color="#FFFFFF"
            display="flex"
            flexDirection="column"
            alignItems={"center"}
        >
            <List sx={{ width: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: (!isOpen ? "center" : "start") }}>
                {Array.isArray(pages) && pages.length > 0 ? (
                    pages.map((item, index) => (

                        <Box key={item.id} width={"100%"} display={"flex"} justifyContent={!isOpen ? "center" : "start"}>
                            <ListItem
                                key={item.id}
                                button
                                component={Link}
                                to={`/${item.value}`}
                                sx={{
                                    "&:hover": { bgcolor: "#475569" },
                                    borderRadius: "8px",
                                    color: "white",
                                    display: "flex",
                                    width: "45px",
                                    alignItems: "center",
                                    position: "absolute",
                                    transform: !isOpen ? "translateY(0)" : "translateY(200px)", // Starting position
                                    opacity: !isOpen ? 1 : 0,
                                    transition: `all 0.7s ease ${index * 0.2}s`, // Smooth transition with cascading effect
                                    paddingLeft: "5px", // Remove padding for icons and text
                                    paddingRight: "0px", // Remove padding for icons and text
                                }}
                            >
                                {isOpen ? (
                                    <>
                                        {/* Show Icon and Text when expanded */}
                                        <ListItemIcon sx={{ color: "#FFFFFF", textAlign: "center", fontSize: "40px", height: "50px" }}>
                                            {categoryIcons[item.value] || <HeadphonesIcon />}
                                        </ListItemIcon>
                                    </>
                                ) : (
                                    <ListItemIcon sx={{ color: "#FFFFFF", textAlign: "center", fontSize: "40px" }}>
                                        {categoryIcons[item.value] || <HeadphonesIcon />}
                                    </ListItemIcon>
                                )}
                            </ListItem>
                            <ListItem
                                key={item.id}
                                button
                                component={Link}
                                to={`all/${item.value}`}
                                sx={{
                                    "&:hover": { bgcolor: "#475569" },
                                    borderRadius: "8px",
                                    color: "white",
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    position: "relative",
                                    transform: isOpen ? "translateY(0)" : "translateY(200px)", // Starting position
                                    opacity: isOpen ? 1 : 0,
                                    transition: `all 0.7s ease ${index * 0.2}s`, // Smooth transition with cascading effect
                                    paddingLeft: "5px", // Remove padding for icons and text
                                    paddingRight: "0px", // Remove padding for icons and text
                                }}
                            >
                                {isOpen ? (
                                    <>
                                        {/* Show Icon and Text when expanded */}
                                        <ListItemIcon sx={{ color: "#FFFFFF", textAlign: "center", fontSize: "40px", height: "50px" }}>
                                            {categoryIcons[item.value] || <HeadphonesIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </>
                                ) : (
                                    // Show only icon without text when collapsed
                                    <ListItemIcon sx={{ color: "#FFFFFF", textAlign: "center", fontSize: "40px" }}>
                                        {categoryIcons[item.value] || <HeadphonesIcon />}
                                    </ListItemIcon>
                                )}
                            </ListItem>

                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" textAlign="center" marginTop={2}>
                        No categories available
                    </Typography>
                )}
            </List>
        </Box>
    );
}
