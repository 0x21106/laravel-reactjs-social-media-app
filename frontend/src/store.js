import { createStore } from "redux";
import BaseReducer from "./reducers/baseReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(BaseReducer, composeWithDevTools());

export default store;
