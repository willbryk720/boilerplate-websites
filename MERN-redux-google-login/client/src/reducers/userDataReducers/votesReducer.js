import {
  GET_USER_VOTES,
  USER_VOTES_LOADING,
  CREATE_UP_DOWN_VOTE
} from "../../actions/types";

const initialState = {
  uservotes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_VOTES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_VOTES:
      return {
        ...state,
        uservotes: action.payload,
        loading: false
      };
    case CREATE_UP_DOWN_VOTE:
      let { voteAction, voteData } = action.payload;

      // previousVote will be undefined if the user hadn't previously voted on this
      const previousVote = state.uservotes.find(vote => {
        return (
          vote.dataID == voteData.dataID &&
          vote.contentType == voteData.contentType
        );
      });

      // any vote created after last load will have the deltaWithoutVote property
      // which is all that is needed to adjust the voteDiff = upVotes - downVotes
      // It's also necessary to still store a deleted vote so that the voteDiff
      // would be correct, so I set a property isDeleted
      if (previousVote) {
        // if doesnt have this property than it was created before the last load
        // so can use it to get the delta from the current voteDiff if there weren't any up or down votes
        // Like if the arrows were both black
        if (!previousVote.hasOwnProperty("deltaWithoutVote")) {
          voteData.deltaWithoutVote = previousVote.isUpVote ? -1 : 1;
        } else {
          voteData.deltaWithoutVote = previousVote.deltaWithoutVote;
        }
      } else {
        voteData.deltaWithoutVote = 0;
      }

      if (voteAction === "delete") {
        voteData.isDeleted = true;
      }

      const filteredVotes = state.uservotes.filter(
        vote =>
          vote.dataID != voteData.dataID ||
          vote.contentType != voteData.contentType
      );

      // filter out vote in uservotes if its about to be updated
      // if its a new vote, this will merely return state.uservotes
      console.log(voteData, "VOTEDATA");

      return {
        ...state,
        uservotes: [voteData, ...filteredVotes],
        loading: false
      };

    default:
      return state;
  }
}
