import { Form, Link, useLocation, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import ItemGrid from "../components/ItemGrid";
import { Box, TextField, Button, Modal, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Category() {
    const { path } = useParams();
    const { getData, postData, deleteData, editData } = useAxios();
    const [data, setPages] = useState([]);
    const [newItem, setNewItem] = useState({ title: "", price_current: "", rate: "", img: [""] });
    const [open, setOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // Tahrir uchun item
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query'); // Qidiruv so‘zi
    

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await getData(path);
                setPages(fetchedData);
            } catch (error) {
                console.error("Failed to fetch data:", error.message);
            }
        }
        fetchData();
    }, [path]);

    // Qidiruvga asosan data filtrlash
    useEffect(() => {
        if (searchQuery) {
            setPages((prevData) => prevData.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            setPages(data); // Agar qidiruv bo'lmasa, asl ma'lumotlarni ko'rsatish
        }
    }, [searchQuery]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const addedItem = await postData(path, newItem);
            setPages((prev) => [...prev, addedItem]);
            setNewItem({ title: "", price_current: "", rate: "", img: [""] });
            setOpen(false);
        } catch (error) {
            console.error("Failed to add item:", error.message);
        }
    };

    const handleAddImageField = () => {
        setNewItem((prev) => ({ ...prev, img: [...prev.img, ""] }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...newItem.img];
        updatedImages[index] = value;
        setNewItem((prev) => ({ ...prev, img: updatedImages }));
    };

    // O‘chirish funksiyasi
    const handleRemoveImage = (index) => {
        const updatedImages = newItem.img.filter((_, i) => i !== index);
        setNewItem((prev) => ({ ...prev, img: updatedImages }));
    };

    const handleEditItem = (item) => {
        setEditingItem(item); // Edit uchun itemni set qilish
        setNewItem(item); // Modalga tahrir qilish uchun itemni to‘ldirish
        setOpen(true); // Modalni ochish
    };

    const handleSaveEditItem = async (e) => {
        e.preventDefault();
        try {
            const updatedItem = await editData(path, newItem.id, newItem);
            setPages((prev) =>
                prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)) // Tahrirlangan itemni yangilash
            );
            setNewItem({ title: "", price_current: "", rate: "", img: [""] });
            setOpen(false); // Modalni yopish
            setEditingItem(null); // Tahrir jarayonini tugatish
        } catch (error) {
            console.error("Failed to edit item:", error.message);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteData(`${path}/${id}`);
            setPages((prev) => prev.filter((item) => item.id !== id)); // O‘chirilgan itemni UI'dan olib tashlash
        } catch (error) {
            console.error("Failed to delete item:", error.message);
        }
    };

    return (
        <Box>
            {/* Add Item / Edit Item Modal */}
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                Add New Item
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        {editingItem ? "Edit Item" : "Add New Item"}
                    </Typography>
                    <Box component="form" onSubmit={editingItem ? handleSaveEditItem : handleAddItem}>
                        <TextField
                            label="Title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Price"
                            value={newItem.price_current}
                            onChange={(e) => setNewItem({ ...newItem, price_current: e.target.value })}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Rate"
                            value={newItem.rate}
                            onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        {newItem.img.map((url, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <TextField
                                    label={`Image URL ${index + 1}`}
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    fullWidth
                                    required
                                />
                                <IconButton color="primary" onClick={handleAddImageField} sx={{ ml: 1 }}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleRemoveImage(index)}
                                    sx={{ ml: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button type="submit" variant="contained" color="primary">
                            {editingItem ? "Save Changes" : "Add Item"}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Item Grid */}
            <ItemGrid data={data} path={path} onEdit={handleEditItem} onDelete={handleDeleteItem} />
        </Box>
    );
}
