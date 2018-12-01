// this reducer is for combine all loading reducers

import { combineReducers } from "redux";

import documentEventsReducer from "./documentEventsReducer";
import questionEventsReducer from "./questionEventsReducer";
import exampleEventsReducer from "./exampleEventsReducer";
import notifyingEventsReducer from "./notifyingEventsReducer";

export default combineReducers({
  documentEvents: documentEventsReducer,
  questionEvents: questionEventsReducer,
  exampleEvents: exampleEventsReducer,
  notifyingEvents: notifyingEventsReducer
});
