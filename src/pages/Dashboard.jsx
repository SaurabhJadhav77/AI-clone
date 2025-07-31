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

const Dashboard = ({onOpenChat }) => {
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

  const handleDelete = (id, e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this chatroom?")) {
      dispatch(deleteChatroom(id));
    }
  };

  // const handleChatClick = (chatId) => {
  //   navigate(`/dashboard/chat/${chatId}`);
  // };
    const handleChatClick = (chatId) => {
    if (onOpenChat) {
      onOpenChat(chatId); 
    }
  };

  return (
    <Box
      sx={{
        p: 3,

        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" fontWeight={600}>
        Chatroom Dashboard
      </Typography>

      <Box display="flex" gap={2}>
        <TextField
          label="New Chatroom Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Create
        </Button>
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
      />

      <Box
        sx={{
          flexGrow: 1, 
          overflowY: "auto", 
          maxHeight: "calc(100vh - 350px)", 
          pr: 1, 
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {filteredRooms.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              No chatrooms found.
            </Typography>
          ) : (
            filteredRooms.map((room) => (
              <Card
                key={room.id}
                sx={{
                  cursor: "pointer",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.01)",
                  },
                }}
                onClick={() => handleChatClick(room.id)}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">{room.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(room.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <IconButton onClick={(e) => handleDelete(room.id, e)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;