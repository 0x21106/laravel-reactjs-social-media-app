import * as actions from "./actions";

const initialState = {
  documentReadyState: "__LOADING__",
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
};

const BaseReducer = (oldState = initialState, payload) => {
  switch (payload.type) {
    case actions.DOCUMENT_LOADED:
      return {
        ...oldState,
        documentReadyState: "__LOADED__",
      };
    case actions.AUTH_USER_LOGIN:
      return {
        ...oldState,
        authUser: payload.data,
      };
    case actions.AUTH_USER_LOGOUT:
      localStorage.removeItem("authUser");
      return {
        ...oldState,
        authUser: null,
      };
    default:
      return oldState;
  }
};

export default BaseReducer;
