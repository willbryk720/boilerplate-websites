// this reducer is for combine all loading reducers

import { combineReducers } from "redux";

import metamodulesLoadingReducer from "./metamodulesLoadingReducer";
import moduleInstancesLoadingReducer from "./moduleInstancesLoadingReducer";
import questionsLoadingReducer from "./questionsLoadingReducer";
import examplesLoadingReducer from "./examplesLoadingReducer";
import metamoduleThoughtsLoadingReducer from "./metamoduleThoughtsLoadingReducer";
import textbooksLoadingReducer from "./textbooksLoadingReducer";
import documentModulesLoadingReducer from "./documentModulesLoadingReducer";

export default combineReducers({
  metamodulesLoading: metamodulesLoadingReducer,
  moduleInstancesLoading: moduleInstancesLoadingReducer,
  questionsLoading: questionsLoadingReducer,
  examplesLoading: examplesLoadingReducer,
  metamoduleThoughtsLoading: metamoduleThoughtsLoadingReducer,
  textbooksLoading: textbooksLoadingReducer,
  documentModulesLoading: documentModulesLoadingReducer
});
