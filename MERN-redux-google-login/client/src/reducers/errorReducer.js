import { GOT_ERROR, CONSUMED_ERROR } from "../actions/types";

const initialState = { errorList: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ERROR:
      console.log(action.payload);
      return {
        ...state,
        errorList: [action.payload, ...state.errorList]
      };
    case CONSUMED_ERROR:
      const { errorType, errorID } = action.payload;
      return {
        ...state,
        errorList: state.errorList.filter(
          error => error.errorType != errorType || error.errorID != errorID
        )
      };
    default:
      return state;
  }
}
