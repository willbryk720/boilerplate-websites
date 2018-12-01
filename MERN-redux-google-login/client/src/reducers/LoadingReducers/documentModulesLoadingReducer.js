import {
  REFRESH_METAMODULE,
  REFRESH_METAMODULE_LOADING,
  DOCUMENT_MODULE_LOADING,
  ADD_DOCUMENT_MODULE,
  DOWNLOADING_ADD_DOCUMENT_MODULE,
  DOWNLOAD_TEXTBOOK_LOADING,
  GOT_ERROR
} from "../../actions/types";

const initialState = {
  refreshLoadingList: [],
  loadingList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REFRESH_METAMODULE: {
      const moduleID = action.payload.moduleID;

      return {
        ...state,
        refreshLoadingList: state.refreshLoadingList.filter(
          mID => mID !== moduleID
        )
      };
    }
    case REFRESH_METAMODULE_LOADING: {
      return {
        ...state,
        refreshLoadingList: [action.moduleID, ...state.refreshLoadingList]
      };
    }
    case DOCUMENT_MODULE_LOADING: {
      return {
        ...state,
        loadingList: [action.moduleDocumentInfo, ...state.loadingList]
      };
    }
    case ADD_DOCUMENT_MODULE: {
      let { moduleID } = action.moduleDocumentInfo;
      const { moduleType } = action.payload;

      if (moduleType === "metamodule") {
        return {
          ...state,
          loadingList: state.loadingList.filter(
            loadingModule => loadingModule.moduleID !== moduleID
          )
        };
      } else {
        return {
          ...state
        };
      }
    }
    case DOWNLOADING_ADD_DOCUMENT_MODULE: {
      const moduleID = action.payload.moduleID;
      return {
        ...state,
        loadingList: state.loadingList.filter(
          loadingModule => loadingModule.moduleID !== moduleID
        )
      };
    }
    case DOWNLOAD_TEXTBOOK_LOADING: {
      return {
        ...state,
        loadingList: []
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "addMetamoduleToDocumentModules") {
        return {
          ...state,
          loadingList: state.loadingList.filter(
            loadingModule => loadingModule.moduleID !== errorID
          )
        };
      } else if (errorType === "refreshDocumentMetamodule") {
        return {
          ...state,
          refreshLoadingList: state.loadingList.filter(
            loadingModule => loadingModule.moduleID !== errorID
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
