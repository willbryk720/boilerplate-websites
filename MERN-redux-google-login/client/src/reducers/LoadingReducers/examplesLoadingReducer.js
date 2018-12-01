import {
  GET_EXAMPLES,
  EXAMPLES_LOADING,
  CREATE_EXAMPLE,
  CREATE_EXAMPLE_LOADING,
  CREATE_SOLUTION,
  CREATE_SOLUTION_LOADING,
  DELETE_SOLUTION,
  DELETE_SOLUTION_LOADING,
  DELETE_EXAMPLE,
  DELETE_EXAMPLE_LOADING,
  EDIT_EXAMPLE,
  EDIT_EXAMPLE_LOADING,
  EDIT_SOLUTION,
  EDIT_SOLUTION_LOADING,
  GOT_ERROR
} from "../../actions/types";

const initialState = {
  createExampleLoadingList: [],
  createSolutionLoadingList: [],
  deleteSolutionLoadingList: [],
  deleteExampleLoadingList: [],
  editSolutionLoadingList: [],
  editExampleLoadingList: [],
  getExamplesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMPLES: {
      return {
        ...state,
        getExamplesLoading: false
      };
    }
    case EXAMPLES_LOADING: {
      return {
        ...state,
        getExamplesLoading: true
      };
    }
    case CREATE_EXAMPLE: {
      return {
        ...state,
        createExampleLoadingList: state.createExampleLoadingList.filter(
          mID => mID !== action.payload.metamodule
        )
      };
    }
    case CREATE_SOLUTION: {
      const exampleID = action.payload.exampleID;

      return {
        ...state,
        createSolutionLoadingList: state.createSolutionLoadingList.filter(
          qID => qID !== exampleID
        )
      };
    }
    case CREATE_EXAMPLE_LOADING: {
      return {
        ...state,
        createExampleLoadingList: [
          action.metamoduleID,
          ...state.createExampleLoadingList
        ]
      };
    }
    case CREATE_SOLUTION_LOADING: {
      return {
        ...state,
        createSolutionLoadingList: [
          action.exampleID,
          ...state.createSolutionLoadingList
        ]
      };
    }
    case DELETE_SOLUTION_LOADING: {
      return {
        ...state,
        deleteSolutionLoadingList: [
          action.payload.solutionID,
          ...state.deleteSolutionLoadingList
        ]
      };
    }
    case DELETE_SOLUTION: {
      const { solutionID } = action.payload;
      return {
        ...state,
        deleteSolutionLoadingList: state.deleteSolutionLoadingList.filter(
          rID => rID !== solutionID
        )
      };
    }
    case DELETE_EXAMPLE_LOADING: {
      return {
        ...state,
        deleteExampleLoadingList: [
          action.payload.exampleID,
          ...state.deleteExampleLoadingList
        ]
      };
    }
    case DELETE_EXAMPLE: {
      const { exampleID } = action.payload;
      return {
        ...state,
        deleteExampleLoadingList: state.deleteExampleLoadingList.filter(
          qID => qID !== exampleID
        )
      };
    }
    case EDIT_EXAMPLE_LOADING: {
      return {
        ...state,
        editExampleLoadingList: [
          action.payload.exampleID,
          ...state.editExampleLoadingList
        ]
      };
    }
    case EDIT_EXAMPLE: {
      const { exampleID } = action.payload;

      return {
        ...state,
        editExampleLoadingList: state.editExampleLoadingList.filter(
          qID => qID !== exampleID
        )
      };
    }
    case EDIT_SOLUTION_LOADING: {
      return {
        ...state,
        editSolutionLoadingList: [
          action.payload.solutionID,
          ...state.editSolutionLoadingList
        ]
      };
    }
    case EDIT_SOLUTION: {
      const { solutionID } = action.payload;
      return {
        ...state,
        editSolutionLoadingList: state.editSolutionLoadingList.filter(
          rID => rID !== solutionID
        )
      };
    }
    case GOT_ERROR: {
      const { errorID, errorType } = action.payload;
      if (errorType === "createExample") {
        return {
          ...state,
          createExampleLoadingList: state.createExampleLoadingList.filter(
            mID => mID !== errorID
          )
        };
      } else if (errorType === "editExample") {
        return {
          ...state,
          editExampleLoadingList: state.editExampleLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "deleteExample") {
        return {
          ...state,
          deleteExampleLoadingList: state.deleteExampleLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "createSolution") {
        return {
          ...state,
          createSolutionLoadingList: state.createSolutionLoadingList.filter(
            qID => qID !== errorID
          )
        };
      } else if (errorType === "editSolution") {
        return {
          ...state,
          editSolutionLoadingList: state.editSolutionLoadingList.filter(
            rID => rID !== errorID
          )
        };
      } else if (errorType === "deleteSolution") {
        return {
          ...state,
          deleteSolutionLoadingList: state.deleteSolutionLoadingList.filter(
            rID => rID !== errorID
          )
        };
      } else if (errorType === "getExamples") {
        return {
          ...state,
          getExamplesLoading: false
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
