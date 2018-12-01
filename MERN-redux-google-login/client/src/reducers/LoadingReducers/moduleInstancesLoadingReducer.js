import {
  CREATE_MODULE_INSTANCE,
  CREATE_MODULE_INSTANCE_LOADING,
  DELETE_MODULE_INSTANCE,
  DELETE_MODULE_INSTANCE_LOADING,
  EDIT_MODULE_INSTANCE,
  EDIT_MODULE_INSTANCE_LOADING,
  GOT_ERROR
} from "../../actions/types";

// createModuleInstanceLoadingList stores list of parents of module instances
// so that the create module instance events knows which one to filter after
// create event (it doesnt have access to the newly created moduleInstanceID)
const initialState = {
  createModuleInstanceLoadingList: [],
  deleteModuleInstanceLoadingList: [],
  editModuleInstanceLoadingList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_MODULE_INSTANCE:
      return {
        ...state,
        createModuleInstanceLoadingList: state.createModuleInstanceLoadingList.filter(
          parentID => parentID !== action.parentModuleInstanceID
        )
      };
    case CREATE_MODULE_INSTANCE_LOADING: {
      return {
        ...state,
        createModuleInstanceLoadingList: [
          action.parentModuleInstanceID,
          ...state.createModuleInstanceLoadingList
        ]
      };
    }
    case DELETE_MODULE_INSTANCE: {
      console.log("DELETE_MODULE_INSTANCE action.payload", action.payload);
      const { moduleInstanceID } = action.payload;
      return {
        ...state,
        deleteModuleInstanceLoadingList: state.deleteModuleInstanceLoadingList.filter(
          miID => miID !== moduleInstanceID
        )
      };
    }
    case DELETE_MODULE_INSTANCE_LOADING: {
      const { metamoduleID, moduleInstanceID } = action.payload;
      return {
        ...state,
        deleteModuleInstanceLoadingList: [
          ...state.deleteModuleInstanceLoadingList,
          moduleInstanceID
        ]
      };
    }
    case EDIT_MODULE_INSTANCE: {
      const { moduleInstanceID } = action.payload;
      return {
        ...state,
        editModuleInstanceLoadingList: state.editModuleInstanceLoadingList.filter(
          miID => miID !== moduleInstanceID
        )
      };
    }
    case EDIT_MODULE_INSTANCE_LOADING: {
      const { moduleInstanceID } = action.payload;
      return {
        ...state,
        editModuleInstanceLoadingList: [
          ...state.editModuleInstanceLoadingList,
          moduleInstanceID
        ]
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createModuleInstance") {
        return {
          ...state,
          createModuleInstanceLoadingList: state.createModuleInstanceLoadingList.filter(
            parentID => parentID !== errorID
          )
        };
      } else if (errorType === "editModuleInstance") {
        return {
          ...state,
          editModuleInstanceLoadingList: state.editModuleInstanceLoadingList.filter(
            miID => miID !== errorID
          )
        };
      } else if (errorType === "deleteModuleInstance") {
        return {
          ...state,
          deleteModuleInstanceLoadingList: state.deleteModuleInstanceLoadingList.filter(
            miID => miID !== errorID
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
