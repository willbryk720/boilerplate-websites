import {
  GET_ERRORS,
  CREATE_TEXTBOOK,
  CREATE_TEXTBOOK_LOADING,
  GET_MY_TEXTBOOKS,
  MY_TEXTBOOKS_LOADING,
  UPDATE_TEXTBOOK,
  DELETE_TEXTBOOK,
  GET_PUBLIC_TEXTBOOKS,
  PUBLIC_TEXTBOOKS_LOADING,
  UPDATE_TEXTBOOK_LOADING,
  DELETE_TEXTBOOK_LOADING,
  DOWNLOAD_TEXTBOOK_LOADING,
  DOWNLOAD_TEXTBOOK_DONE,
  COPY_TEXTBOOK_FROM_PUBLIC,
  COPY_TEXTBOOK_FROM_PUBLIC_LOADING,
  GOT_ERROR
} from "../../actions/types";

const initialState = {
  myTextbooksLoading: false,
  publicTextbooksLoading: false,
  createTextbookLoading: false,
  downloadTextbookLoading: false,
  updateTextbookLoadingList: [],
  deleteTextbookLoadingList: [],
  copyTextbookFromPublicLoadingList: []
};

export default function(state = initialState, action) {
  //   console.log("textbook action", action.type);
  switch (action.type) {
    case CREATE_TEXTBOOK: {
      return {
        ...state,
        createTextbookLoading: false
      };
    }
    case CREATE_TEXTBOOK_LOADING: {
      return {
        ...state,
        createTextbookLoading: true
      };
    }
    case UPDATE_TEXTBOOK: {
      const updateTextbook = action.payload;
      return {
        ...state,
        updateTextbookLoadingList: state.updateTextbookLoadingList.filter(
          tID => {
            tID !== updateTextbook._id;
          }
        )
      };
    }
    case UPDATE_TEXTBOOK_LOADING: {
      return {
        ...state,
        updateTextbookLoadingList: [
          action.payload,
          ...state.updateTextbookLoadingList
        ]
      };
    }
    case DELETE_TEXTBOOK: {
      const textbookID = action.payload;
      return {
        ...state,
        deleteTextbookLoadingList: state.deleteTextbookLoadingList.filter(
          tID => {
            tID !== textbookID;
          }
        )
      };
    }
    case DELETE_TEXTBOOK_LOADING: {
      return {
        ...state,
        deleteTextbookLoadingList: [
          action.payload,
          ...state.deleteTextbookLoadingList
        ]
      };
    }
    case GET_MY_TEXTBOOKS: {
      return {
        ...state,
        myTextbooksLoading: false
      };
    }
    case PUBLIC_TEXTBOOKS_LOADING: {
      return {
        ...state,
        publicTextbooksLoading: true
      };
    }
    case GET_PUBLIC_TEXTBOOKS: {
      return {
        ...state,
        publicTextbooksLoading: false
      };
    }
    case MY_TEXTBOOKS_LOADING: {
      return {
        ...state,
        myTextbooksLoading: true
      };
    }
    case DOWNLOAD_TEXTBOOK_LOADING: {
      return {
        ...state,
        downloadTextbookLoading: true
      };
    }
    case DOWNLOAD_TEXTBOOK_DONE: {
      return {
        ...state,
        downloadTextbookLoading: false
      };
    }
    case COPY_TEXTBOOK_FROM_PUBLIC_LOADING: {
      return {
        ...state,
        copyTextbookFromPublicLoadingList: [
          action.payload,
          ...state.copyTextbookFromPublicLoadingList
        ]
      };
    }
    case COPY_TEXTBOOK_FROM_PUBLIC: {
      const textbookID = action.payload._id;
      return {
        ...state,
        copyTextbookFromPublicLoadingList: state.copyTextbookFromPublicLoadingList.filter(
          tID => {
            tID !== textbookID;
          }
        )
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createTextbook") {
        return {
          ...state,
          createTextbookLoading: false
        };
      } else if (errorType === "getMyTextbooks") {
        return {
          ...state,
          myTextbooksLoading: false
        };
      } else if (errorType === "getPublicTextbooks") {
        return {
          ...state,
          publicTextbooksLoading: false
        };
      } else if (errorType === "updateTextbook") {
        return {
          ...state,
          updateTextbookLoadingList: state.updateTextbookLoadingList.filter(
            tID => tID !== errorID
          )
        };
      } else if (errorType === "deleteTextbook") {
        return {
          ...state,
          deleteTextbookLoadingList: state.deleteTextbookLoadingList.filter(
            tID => tID !== errorID
          )
        };
      } else if (errorType === "downloadTextbook") {
        return {
          ...state,
          downloadTextbookLoading: false
        };
      } else if (errorType === "copyTextbookFromPublic") {
        return {
          ...state,
          copyTextbookFromPublicLoadingList: state.copyTextbookFromPublicLoadingList.filter(
            tID => tID !== errorID
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
