import {
  GET_METAMODULE_THOUGHTS,
  METAMODULE_THOUGHTS_LOADING,
  CREATE_METAMODULE_THOUGHT,
  DELETE_METAMODULE_THOUGHT,
  DELETE_METAMODULE_THOUGHT_LOADING,
  CREATE_METAMODULE_THOUGHT_LOADING,
  GOT_ERROR
} from "../../actions/types";

const initialState = {
  createMetamoduleThoughtLoadingList: [],
  deleteMetamoduleThoughtLoadingList: [],
  getMetamoduleThoughtsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_METAMODULE_THOUGHTS: {
      return {
        ...state,
        getMetamoduleThoughtsLoading: false
      };
    }
    case METAMODULE_THOUGHTS_LOADING: {
      return {
        ...state,
        getMetamoduleThoughtsLoading: true
      };
    }
    case CREATE_METAMODULE_THOUGHT: {
      const { metamoduleThought } = action.payload;

      const parentID = metamoduleThought.parentThought
        ? metamoduleThought.parentThought
        : metamoduleThought.metamodule;

      return {
        ...state,
        createMetamoduleThoughtLoadingList: state.createMetamoduleThoughtLoadingList.filter(
          mtID => mtID != parentID
        )
      };
    }
    case CREATE_METAMODULE_THOUGHT_LOADING: {
      const { parentThoughtID, metamoduleID } = action.payload;
      const parentID = parentThoughtID ? parentThoughtID : metamoduleID;
      return {
        ...state,
        createMetamoduleThoughtLoadingList: [
          ...state.createMetamoduleThoughtLoadingList,
          parentID
        ]
      };
    }
    case DELETE_METAMODULE_THOUGHT_LOADING: {
      return {
        ...state,
        deleteMetamoduleThoughtLoadingList: [
          action.payload.metamoduleThoughtID,
          ...state.deleteMetamoduleThoughtLoadingList
        ]
      };
    }
    case DELETE_METAMODULE_THOUGHT: {
      const { metamoduleThought } = action.payload;

      return {
        ...state,
        deleteMetamoduleThoughtLoadingList: state.deleteMetamoduleThoughtLoadingList.filter(
          mtID => mtID !== metamoduleThought._id
        )
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createMetamoduleThought") {
        return {
          ...state,
          createMetamoduleThoughtLoadingList: state.createMetamoduleThoughtLoadingList.filter(
            parentID => parentID !== errorID
          )
        };
      } else if (errorType === "deleteMetamoduleThought") {
        return {
          ...state,
          deleteMetamoduleThoughtLoadingList: state.deleteMetamoduleThoughtLoadingList.filter(
            mtID => mtID !== errorID
          )
        };
      } else if (errorType === "getMetamoduleThoughts") {
        return {
          ...state,
          getMetamoduleThoughtsLoading: false
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
