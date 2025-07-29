// src/redux/chatroomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatrooms: JSON.parse(localStorage.getItem("chatrooms")) || [],
};

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    addChatroom: (state, action) => {
      state.chatrooms.push({ ...action.payload, messages: [] });
      localStorage.setItem("chatrooms", JSON.stringify(state.chatrooms));
    },
    deleteChatroom: (state, action) => {
      state.chatrooms = state.chatrooms.filter(
        (room) => room.id !== action.payload
      );
      localStorage.setItem("chatrooms", JSON.stringify(state.chatrooms));
    },
addMessage: (state, action) => {
  const { roomId, message } = action.payload;
  const roomIndex = state.chatrooms.findIndex((r) => r.id === roomId);
  if (roomIndex !== -1) {
    const updatedRoom = {
      ...state.chatrooms[roomIndex],
      messages: [...state.chatrooms[roomIndex].messages, message],
    };
    state.chatrooms[roomIndex] = updatedRoom;
    localStorage.setItem("chatrooms", JSON.stringify(state.chatrooms));
  }
}

  },
});

export const { addChatroom, deleteChatroom, addMessage } = chatroomSlice.actions;
export default chatroomSlice.reducer;
