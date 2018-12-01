import {
  GET_QUESTIONS,
  QUESTIONS_LOADING,
  CREATE_QUESTION,
  CREATE_QUESTION_LOADING,
  CREATE_RESPONSE,
  CREATE_RESPONSE_LOADING,
  DELETE_RESPONSE,
  DELETE_RESPONSE_LOADING,
  DELETE_QUESTION,
  DELETE_QUESTION_LOADING,
  EDIT_QUESTION,
  EDIT_QUESTION_LOADING,
  EDIT_RESPONSE,
  EDIT_RESPONSE_LOADING,
  GOT_ERROR
} from "../../actions/types";

const initialState = {
  createQuestionLoadingList: [],
  createResponseLoadingList: [],
  deleteResponseLoadingList: [],
  deleteQuestionLoadingList: [],
  editResponseLoadingList: [],
  editQuestionLoadingList: [],
  getQuestionsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS: {
      return {
        ...state,
        getQuestionsLoading: false
      };
    }
    case QUESTIONS_LOADING: {
      return {
        ...state,
        getQuestionsLoading: true
      };
    }
    case CREATE_QUESTION: {
      return {
        ...state,
        createQuestionLoadingList: state.createQuestionLoadingList.filter(
          mID => mID !== action.payload.metamodule
        )
      };
    }
    case CREATE_RESPONSE: {
      const questionID = action.payload.questionID;

      return {
        ...state,
        createResponseLoadingList: state.createResponseLoadingList.filter(
          qID => qID !== questionID
        )
      };
    }
    case CREATE_QUESTION_LOADING: {
      return {
        ...state,
        createQuestionLoadingList: [
          action.metamoduleID,
          ...state.createQuestionLoadingList
        ]
      };
    }
    case CREATE_RESPONSE_LOADING: {
      return {
        ...state,
        createResponseLoadingList: [
          action.questionID,
          ...state.createResponseLoadingList
        ]
      };
    }
    case DELETE_RESPONSE_LOADING: {
      return {
        ...state,
        deleteResponseLoadingList: [
          action.payload.responseID,
          ...state.deleteResponseLoadingList
        ]
      };
    }
    case DELETE_RESPONSE: {
      const { responseID } = action.payload;
      return {
        ...state,
        deleteResponseLoadingList: state.deleteResponseLoadingList.filter(
          rID => rID !== responseID
        )
      };
    }
    case DELETE_QUESTION_LOADING: {
      return {
        ...state,
        deleteQuestionLoadingList: [
          action.payload.questionID,
          ...state.deleteQuestionLoadingList
        ]
      };
    }
    case DELETE_QUESTION: {
      const { questionID } = action.payload;
      return {
        ...state,
        deleteQuestionLoadingList: state.deleteQuestionLoadingList.filter(
          qID => qID !== questionID
        )
      };
    }
    case EDIT_QUESTION_LOADING: {
      return {
        ...state,
        editQuestionLoadingList: [
          action.payload.questionID,
          ...state.editQuestionLoadingList
        ]
      };
    }
    case EDIT_QUESTION: {
      const { questionID } = action.payload;

      return {
        ...state,
        editQuestionLoadingList: state.editQuestionLoadingList.filter(
          qID => qID !== questionID
        )
      };
    }
    case EDIT_RESPONSE_LOADING: {
      return {
        ...state,
        editResponseLoadingList: [
          action.payload.responseID,
          ...state.editResponseLoadingList
        ]
      };
    }
    case EDIT_RESPONSE: {
      const { responseID } = action.payload;
      return {
        ...state,
        editResponseLoadingList: state.editResponseLoadingList.filter(
          rID => rID !== responseID
        )
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createQuestion") {
        return {
          ...state,
          createQuestionLoadingList: state.createQuestionLoadingList.filter(
            mID => mID !== errorID
          )
        };
      } else if (errorType === "editQuestion") {
        return {
          ...state,
          editQuestionLoadingList: state.editQuestionLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "deleteQuestion") {
        return {
          ...state,
          deleteQuestionLoadingList: state.deleteQuestionLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "createResponse") {
        return {
          ...state,
          createResponseLoadingList: state.createResponseLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "editResponse") {
        return {
          ...state,
          editResponseLoadingList: state.editResponseLoadingList.filter(
            rID => rID !== errorID
          )
        };
      } else if (errorType === "deleteResponse") {
        return {
          ...state,
          deleteResponseLoadingList: state.deleteResponseLoadingList.filter(
            rID => rID !== errorID
          )
        };
      } else if (errorType === "getQuestions") {
        return {
          ...state,
          getQuestionsLoading: false
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
