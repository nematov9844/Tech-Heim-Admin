import { Grid, Card, CardMedia, CardContent, Typography, Link, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemGrid({ data, path, onEdit, onDelete }) {
    return (
        <Grid container spacing={4}>
            {data?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2,
                            color: "#fff",
                            bgcolor: "rgba(30, 41, 59, 0.7)",
                        }}
                    >
                        <Link
                            href={`/${path}/${item.id}`}
                            underline="none"
                            sx={{ textDecoration: 'none', width: '100%' }}
                        >
                            <CardMedia
                                component="img"
                                image={item.img[0]}
                                alt={item.title}
                                sx={{
                                    width: '100%',
                                    height: 240,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    marginBottom: 2,
                                }}
                            />
                        </Link>
                        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1rem',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {item.title.length > 15 ? item.title.slice(0, 25) + "..." : item.title}
                            </Typography>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginTop: 1 }}
                            >
                                <Typography variant="body1" color="#fff" fontWeight={600}>
                                    {item.price_current}
                                </Typography>
                                <Typography variant="body2" color="#fff" fontWeight={600}>
                                    {item.rate}
                                </Typography>
                            </Grid>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                            <IconButton color="primary" onClick={() => onEdit(item,item.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
