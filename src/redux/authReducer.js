import { SET_USER, LOGOUT } from "../constants/actionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, user: null };
    default:
      return state;
  }
}
