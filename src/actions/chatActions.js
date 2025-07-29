import {
  CREATE_CHATROOM,
  DELETE_CHATROOM,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "../constants/actionTypes";

export const createChatroom = (title) => ({ type: CREATE_CHATROOM, payload: title });
export const deleteChatroom = (roomId) => ({ type: DELETE_CHATROOM, payload: roomId });
export const addMessage = (roomId, message) => ({
  type: ADD_MESSAGE,
  payload: { roomId, message },
});
export const setMessages = (roomId, messages) => ({
  type: SET_MESSAGES,
  payload: { roomId, messages },
});
