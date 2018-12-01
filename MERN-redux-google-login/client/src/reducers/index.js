import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import votesReducer from "./userDataReducers/votesReducer";
import combineEventsReducers from "./EventReducers/combineEventsReducers";
import loadingComponentsReducer from "./LoadingReducers/loadingReducersCombine";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  userdata: votesReducer,
  events: combineEventsReducers,
  loadingComponents: loadingComponentsReducer
});
