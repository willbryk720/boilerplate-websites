import {
  CREATE_QUESTION,
  CREATE_RESPONSE,
  CREATE_METAMODULE_THOUGHT,
  REMOVE_LEARNING_AIDS_CREATE_EVENT,
  EDIT_QUESTION,
  EDIT_RESPONSE,
  DELETE_QUESTION,
  REMOVE_LEARNING_AIDS_EDIT_EVENT,
  CLEAR_QUESTION_EVENTS
} from "../../actions/types";

const initialState = {
  createEventsList: [],
  editEventsList: []
};

// eventParentID is the id that a CreateBlank can refer to in order
// to delete the createEvent
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION: {
      const newCreateEvent = {
        type: "question",
        eventParentID: action.payload.metamodule
      };
      return {
        ...state,
        createEventsList: [newCreateEvent, ...state.createEventsList]
      };
    }
    case CREATE_RESPONSE: {
      const newCreateEvent = {
        type: "response",
        eventParentID: action.payload.questionID
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
    case EDIT_QUESTION: {
      const newEditEvent = {
        type: "question",
        eventID: action.payload.questionID
      };
      return {
        ...state,
        editEventsList: [newEditEvent, ...state.editEventsList]
      };
    }
    case EDIT_RESPONSE: {
      const newEditEvent = {
        type: "response",
        eventID: action.payload.responseID
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
    case CLEAR_QUESTION_EVENTS: {
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
