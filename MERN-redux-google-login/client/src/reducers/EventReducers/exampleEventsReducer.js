import {
  CREATE_EXAMPLE,
  CREATE_SOLUTION,
  CREATE_METAMODULE_THOUGHT,
  REMOVE_LEARNING_AIDS_CREATE_EVENT,
  EDIT_EXAMPLE,
  EDIT_SOLUTION,
  DELETE_EXAMPLE,
  REMOVE_LEARNING_AIDS_EDIT_EVENT,
  CLEAR_EXAMPLE_EVENTS
} from "../../actions/types";

const initialState = {
  createEventsList: [],
  editEventsList: []
};

// eventParentID is the id that a CreateBlank can refer to in order
// to delete the createEvent
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_EXAMPLE: {
      const newCreateEvent = {
        type: "example",
        eventParentID: action.payload.metamodule
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case CREATE_SOLUTION: {
      const newCreateEvent = {
        type: "solution",
        eventParentID: action.payload.exampleID
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case CREATE_METAMODULE_THOUGHT: {
      const parentThought = action.payload.metamoduleThought.parentThought;
      const newCreateEvent = {
        type: "metamoduleThought",
        eventParentID: parentThought
          ? parentThought
          : action.payload.metamoduleThought.metamodule
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case REMOVE_LEARNING_AIDS_CREATE_EVENT: {
      const { eventParentID, type } = action.payload;
      return {
        ...state,
        createEventsList: state.createEventsList.filter(
          event => event.type !== type || event.eventParentID !== eventParentID
        )
      };
    }
    case EDIT_EXAMPLE: {
      const newEditEvent = {
        type: "example",
        eventID: action.payload.exampleID
      };
      return {
        ...state,
        editEventsList: [newEditEvent, ...state.editEventsList]
      };
    }
    case EDIT_SOLUTION: {
      const newEditEvent = {
        type: "solution",
        eventID: action.payload.solutionID
      };
      return {
        ...state,
        editEventsList: [newEditEvent, ...state.editEventsList]
      };
    }
    case REMOVE_LEARNING_AIDS_EDIT_EVENT: {
      const { eventID, type } = action.payload;
      return {
        ...state,
        editEventsList: state.editEventsList.filter(
          event => event.type !== type || event.eventID !== eventID
        )
      };
    }
    case CLEAR_EXAMPLE_EVENTS: {
      return {
        ...state,
        createEventsList: [],
        editEventsList: []
      };
    }
    default:
      return state;
  }
}
