import {
  CONSUMED_EVENT,
  DELETE_RESPONSE,
  DELETE_QUESTION,
  DELETE_MODULE_INSTANCE,
  CREATE_QUESTION,
  CREATE_RESPONSE,
  EDIT_QUESTION,
  EDIT_RESPONSE,
  DELETE_SOLUTION,
  DELETE_EXAMPLE,
  CREATE_EXAMPLE,
  CREATE_SOLUTION,
  EDIT_EXAMPLE,
  EDIT_SOLUTION
} from "../../actions/types";

const initialState = {
  eventsForNotifyingList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONSUMED_EVENT: {
      const { type, eventParentID } = action.payload;
      return {
        ...state,
        eventsForNotifyingList: state.eventsForNotifyingList.filter(
          event => event.type != type || event.eventParentID != eventParentID
        )
      };
    }
    case DELETE_RESPONSE: {
      const newEvent = {
        type: "delete-response",
        eventParentID: action.payload.responseID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case DELETE_QUESTION: {
      const newEvent = {
        type: "delete-question",
        eventParentID: action.payload.questionID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case DELETE_SOLUTION: {
      const newEvent = {
        type: "delete-solution",
        eventParentID: action.payload.solutionID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case DELETE_EXAMPLE: {
      const newEvent = {
        type: "delete-example",
        eventParentID: action.payload.exampleID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case DELETE_MODULE_INSTANCE: {
      const { metamoduleID, moduleInstanceID } = action.payload;
      const newEvent = {
        type: "delete-moduleInstance",
        eventParentID: moduleInstanceID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case CREATE_QUESTION: {
      const newEvent = {
        type: "create-question",
        eventParentID: action.payload.metamodule
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case CREATE_RESPONSE: {
      const newEvent = {
        type: "create-response",
        eventParentID: action.payload.questionID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case CREATE_EXAMPLE: {
      const newEvent = {
        type: "create-example",
        eventParentID: action.payload.metamodule
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case CREATE_SOLUTION: {
      const newEvent = {
        type: "create-solution",
        eventParentID: action.payload.exampleID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case EDIT_QUESTION: {
      const newEvent = {
        type: "edit-question",
        eventID: action.payload.questionID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case EDIT_RESPONSE: {
      const newEvent = {
        type: "edit-response",
        eventID: action.payload.responseID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case EDIT_EXAMPLE: {
      const newEvent = {
        type: "edit-example",
        eventID: action.payload.exampleID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    case EDIT_SOLUTION: {
      const newEvent = {
        type: "edit-solution",
        eventID: action.payload.solutionID
      };
      return {
        ...state,
        eventsForNotifyingList: [newEvent, ...state.eventsForNotifyingList]
      };
    }
    default:
      return state;
  }
}
