import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
// STore ke lie
import chatroomReducer from "./chatroomSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  chatroom: chatroomReducer,
});

const store = createStore(rootReducer);

export default store;
