import {
  CREATE_METAMODULE,
  CREATE_MODULE_INSTANCE,
  REMOVE_DOCUMENT_CREATE_EVENT,
  EDIT_MODULE_INSTANCE,
  REMOVE_DOCUMENT_EDIT_EVENT
} from "../../actions/types";

const initialState = {
  createEventsList: [],
  editEventsList: [],
  deleteEventsList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_METAMODULE: {
      const newCreateEvent = {
        type: "metamodule",
        eventParentID: action.parentMetamoduleID
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case CREATE_MODULE_INSTANCE: {
      const newCreateEvent = {
        type: "moduleInstance",
        eventParentID: action.parentModuleInstanceID
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case REMOVE_DOCUMENT_CREATE_EVENT: {
      const { eventParentID, type } = action.payload;
      return {
        ...state,
        createEventsList: state.createEventsList.filter(
          event => event.type !== type || event.eventParentID !== eventParentID
        )
      };
    }
    case EDIT_MODULE_INSTANCE: {
      const { metamoduleID, moduleInstanceID } = action.payload;
      const newEditEvent = {
        type: "moduleInstance",
        eventID: moduleInstanceID
      };
      return {
        ...state,
        editEventsList: [...state.editEventsList, newEditEvent]
      };
    }
    case REMOVE_DOCUMENT_EDIT_EVENT: {
      const { eventID, type } = action.payload;
      return {
        ...state,
        editEventsList: state.editEventsList.filter(
          event => event.type !== type || event.eventID !== eventID
        )
      };
    }

    default:
      return state;
  }
}
