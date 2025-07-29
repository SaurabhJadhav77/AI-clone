import {
  CREATE_CHATROOM,
  DELETE_CHATROOM,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "../constants/actionTypes";
// import {

//   SET_MESSAGES,
// } from "../constants/actionTypes";

const initialState = {
  chatrooms: JSON.parse(localStorage.getItem("chatrooms")) || [],
  messages: {}, // { roomId: [messages] }
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CHATROOM:
      const newRoom = { id: Date.now().toString(), title: action.payload };
      const updatedRooms = [...state.chatrooms, newRoom];
      localStorage.setItem("chatrooms", JSON.stringify(updatedRooms));
      return { ...state, chatrooms: updatedRooms };

    case DELETE_CHATROOM:
      const remaining = state.chatrooms.filter(r => r.id !== action.payload);
      localStorage.setItem("chatrooms", JSON.stringify(remaining));
      return { ...state, chatrooms: remaining };

    case ADD_MESSAGE:
      const { roomId, message } = action.payload;
      const updatedMsgs = state.messages[roomId]
        ? [...state.messages[roomId], message]
        : [message];
      return {
        ...state,
        messages: { ...state.messages, [roomId]: updatedMsgs },
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: { ...state.messages, [action.payload.roomId]: action.payload.messages },
      };

    default:
      return state;
  }
}
