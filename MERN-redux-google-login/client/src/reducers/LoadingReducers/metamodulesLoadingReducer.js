import {
  CREATE_METAMODULE,
  CREATE_METAMODULE_LOADING,
  GOT_ERROR
} from "../../actions/types";

// createMetamoduleLoadingList stores list of parents of metamodules
// so that the create metamodule events know which one to filter after
// create event (it doesnt have access to the newly created metamoduleID)
const initialState = {
  createMetamoduleLoadingList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_METAMODULE:
      return {
        ...state,
        createMetamoduleLoadingList: state.createMetamoduleLoadingList.filter(
          parentID => parentID !== action.parentMetamoduleID
        )
      };
    case CREATE_METAMODULE_LOADING: {
      return {
        ...state,
        createMetamoduleLoadingList: [
          action.parentMetamoduleID,
          ...state.createMetamoduleLoadingList
        ]
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createMetamodule") {
        return {
          ...state,
          createMetamoduleLoadingList: state.createMetamoduleLoadingList.filter(
            parentID => parentID !== errorID
          )
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
