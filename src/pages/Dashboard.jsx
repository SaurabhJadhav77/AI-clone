import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom, deleteChatroom } from "../redux/chatroomSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch();
  const chatrooms = useSelector((state) => state.chatroom?.chatrooms);

  const [title, setTitle] = useState("");


  
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(chatrooms);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = chatrooms.filter((room) =>
        room.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRooms(filtered);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, chatrooms]);

  const handleAdd = () => {
    if (!title.trim()) return alert("Chatroom title is required!");
    const newRoom = {
      id: uuidv4(),
      title,
      createdAt: new Date().toISOString(),
    };
    dispatch(addChatroom(newRoom));
    setTitle("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this chatroom?")) {
      dispatch(deleteChatroom(id));
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Chatroom Dashboard</Typography>

      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="New Chatroom Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>Create</Button>
      </Box>

      <TextField
        label="Search Chatrooms"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">🔍</InputAdornment>,
        }}
        sx={{ mb: 2 }}
      />

      <Box display="grid" gap={2}>
        {filteredRooms.length === 0 ? (
          <Typography>No chatrooms found.</Typography>
        ) : (
          filteredRooms.map((room) => (
         <Card key={room.id} onClick={() => navigate(`/chat/${room.id}`)} sx={{ cursor: "pointer" }}>
  <CardContent
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="subtitle1">{room.title}</Typography>
      <Typography variant="caption" color="textSecondary">
        Created at: {new Date(room.createdAt).toLocaleString()}
      </Typography>
    </Box>
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); // Prevent card click from triggering
        handleDelete(room.id);
      }}
    >
      <DeleteIcon color="error" />
    </IconButton>
  </CardContent>
</Card>

          ))
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
