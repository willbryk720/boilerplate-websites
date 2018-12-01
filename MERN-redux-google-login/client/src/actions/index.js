import axios from "axios";

import {
  GET_ERRORS,
  FETCH_USER,
  CREATE_METAMODULE,
  CREATE_MODULE_INSTANCE,
  GET_USER_VOTES,
  LOGOUT_USER,
  OPEN_SORTABLE_TREE,
  CLOSE_SORTABLE_TREE,
  CHANGE_FLATTENED_TREE,
  REMOVE_DOCUMENT_CREATE_EVENT,
  REMOVE_DOCUMENT_EDIT_EVENT,
  CREATE_METAMODULE_LOADING,
  CREATE_MODULE_INSTANCE_LOADING,
  DELETE_MODULE_INSTANCE,
  DELETE_MODULE_INSTANCE_LOADING,
  EDIT_MODULE_INSTANCE,
  EDIT_MODULE_INSTANCE_LOADING,
  DELETE_METAMODULE,
  GOT_ERROR
} from "./types";

// Create Metamodule
export const createMetamodule = metamoduleData => dispatch => {
  dispatch(setCreateMetamoduleLoading(metamoduleData.parentMetamoduleID));
  axios
    .post("/api/metamodules", metamoduleData)
    .then(res => {
      dispatch({
        type: CREATE_METAMODULE,
        payload: res.data,
        parentMetamoduleID: metamoduleData.parentMetamoduleID
      });
    })
    .catch(err => {
      dispatch({
        type: GOT_ERROR,
        payload: {
          errorType: "createMetamodule",
          errorID: metamoduleData.parentMetamoduleID,
          errorMsg:
            err.response && err.response.data
              ? err.response.data.errorMsg
              : "Failed to reach server."
        }
      });
    });
};

// Create Module Instance
export const createModuleInstance = moduleInstanceData => dispatch => {
  dispatch(
    setCreateModuleInstanceLoading(moduleInstanceData.parentModuleInstanceID)
  );
  axios
    .post("/api/moduleinstances", moduleInstanceData)
    .then(res => {
      dispatch({
        type: CREATE_MODULE_INSTANCE,
        payload: res.data,
        parentModuleInstanceID: moduleInstanceData.parentModuleInstanceID
      });
    })
    .catch(err => {
      dispatch({
        type: GOT_ERROR,
        payload: {
          errorType: "createModuleInstance",
          errorID: moduleInstanceData.parentModuleInstanceID,
          errorMsg:
            err.response && err.response.data
              ? err.response.data.errorMsg
              : "Failed to reach server."
        }
      });
    });
};

export const editModuleInstance = moduleInstanceData => dispatch => {
  dispatch(setEditModuleInstanceLoading(moduleInstanceData));
  axios
    .post("/api/moduleInstances/edit", moduleInstanceData)
    .then(res => {
      dispatch({
        type: EDIT_MODULE_INSTANCE,
        payload: { newEditedModuleInstance: res.data, ...moduleInstanceData }
      });
    })
    .catch(err => {
      dispatch({
        type: GOT_ERROR,
        payload: {
          errorType: "editModuleInstance",
          errorID: moduleInstanceData.moduleInstanceID,
          errorMsg:
            err.response && err.response.data
              ? err.response.data.errorMsg
              : "Failed to reach server."
        }
      });
    });
};

// moduleInstanceData contains metamoduleID and moduleInstanceID
export const deleteModuleInstance = moduleInstanceData => dispatch => {
  dispatch(setDeleteModuleInstanceLoading(moduleInstanceData));
  axios
    .post("/api/moduleInstances/delete", moduleInstanceData)
    .then(res => {
      // if the whole metamodule got deleted, happens rarely
      if (res.data.isMetamoduleDeleted) {
        dispatch({
          type: DELETE_METAMODULE,
          payload: { ...moduleInstanceData }
        });
        // TODO setDeleteModuleInstanceNotLoading(moduleInstanceData)
      } else {
        dispatch({
          type: DELETE_MODULE_INSTANCE,
          payload: { newDeletedModuleInstance: res.data, ...moduleInstanceData }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GOT_ERROR,
        payload: {
          errorType: "deleteModuleInstance",
          errorID: moduleInstanceData.moduleInstanceID,
          errorMsg:
            err.response && err.response.data
              ? err.response.data.errorMsg
              : "Failed to reach server."
        }
      });
    });
};

// Get User
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getUserData = () => async dispatch => {
  const res = await axios.get("/api/userdata");
  dispatch({ type: GET_USER_VOTES, payload: res.data });
};

// logout user
export const logoutUser = () => async dispatch => {
  const res = await axios.get("/auth/logout");

  dispatch({ type: LOGOUT_USER, payload: res.data });
};

export const setEditModuleInstanceLoading = moduleInstanceData => {
  return {
    type: EDIT_MODULE_INSTANCE_LOADING,
    payload: moduleInstanceData
  };
};

export const setDeleteModuleInstanceLoading = moduleInstanceData => {
  return {
    type: DELETE_MODULE_INSTANCE_LOADING,
    payload: moduleInstanceData
  };
};

export const setCreateModuleInstanceLoading = parentModuleInstanceID => {
  return {
    type: CREATE_MODULE_INSTANCE_LOADING,
    parentModuleInstanceID: parentModuleInstanceID
  };
};

export const setCreateMetamoduleLoading = parentMetamoduleID => {
  return {
    type: CREATE_METAMODULE_LOADING,
    parentMetamoduleID: parentMetamoduleID
  };
};

// Remove the create event
export const removeDocumentCreateEvent = eventData => dispatch => {
  dispatch({
    type: REMOVE_DOCUMENT_CREATE_EVENT,
    payload: eventData
  });
};

// Remove the edit event
export const removeDocumentEditEvent = eventData => dispatch => {
  dispatch({
    type: REMOVE_DOCUMENT_EDIT_EVENT,
    payload: eventData
  });
};

export const openSortableTree = () => dispatch => {
  dispatch({
    type: OPEN_SORTABLE_TREE
  });
};

export const closeSortableTree = () => dispatch => {
  dispatch({
    type: CLOSE_SORTABLE_TREE
  });
};

export const changeFlattenedTree = flattenedTree => dispatch => {
  dispatch({
    type: CHANGE_FLATTENED_TREE,
    payload: flattenedTree
  });
};
