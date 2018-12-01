import React, { Component } from "react";
import { connect } from "react-redux";
import { createUpDownVote } from "../actions/LearningAids/learningAidActions";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import "../css/SmallCreateUpVote.css";

class CreateUpDownVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataID: props.dataID,
      contentType: props.contentType,
      upVotes: props.upVotes,
      downVotes: props.downVotes
    };

    // don't know if this should be called bc it worked without it
    this.clickedUpDownVote = this.clickedUpDownVote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // even though this component was receiving new props with new upvotes and downvotes, it wasnt updating
    this.setState({
      upVotes: nextProps.upVotes,
      downVotes: nextProps.downVotes,
      dataID: nextProps.dataID
    });
  }

  clickedUpDownVote(isUpVote) {
    // check if a current vote exists
    const currentVote = this.props.uservotes.find(vote => {
      return (
        vote.dataID == this.state.dataID &&
        vote.contentType == this.state.contentType
      );
    });

    // only deleting a vote if there is a vote stored locally that is the same as what the user pressed
    // and where the locally stored one is not a vote marked as deleted (since last load of user votes)
    const isDeletingVote =
      currentVote && currentVote.isUpVote === isUpVote && !currentVote.isDeleted
        ? true
        : false;

    const vote = {
      dataID: this.state.dataID,
      isUpVote: isUpVote,
      contentType: this.state.contentType,
      isDeletingVote: isDeletingVote
    };

    // for the redux stuff
    this.props.createUpDownVote(vote);
  }

  render() {
    // should use this at some point for feedback on creating the new module instance TODO FARAWAY
    // const { upVotes, downVotes, dataID, contentType } = this.state;
    const { upVotes, downVotes, dataID, contentType } = this.state;
    const { uservotes } = this.props;

    const currentVote = uservotes.find(vote => {
      return vote.dataID == dataID && vote.contentType == contentType;
    });

    let upVoteColor = "black";
    let downVoteColor = "black";
    let voteDiff = upVotes - downVotes;

    if (currentVote) {
      if (!currentVote.isDeleted) {
        currentVote.isUpVote ? (upVoteColor = "red") : (downVoteColor = "red");

        // only modify number if the vote was made after the last call
        // to load the user votes
        if (currentVote.hasOwnProperty("deltaWithoutVote")) {
          voteDiff +=
            currentVote.deltaWithoutVote + (currentVote.isUpVote ? 1 : -1);
        }
      } else {
        // if its deleted then it definitely has the property deltaWithoutVote
        voteDiff += currentVote.deltaWithoutVote;
      }
    }

    return (
      <React.Fragment>
        <Icon
          className="upvote-icon"
          style={{ cursor: "pointer" }}
          color={upVoteColor}
          name="angle up"
          size="big"
          onClick={e => {
            e.preventDefault();
            this.clickedUpDownVote(true);
          }}
        />

        {/* <i
            style={{ cursor: "pointer", color: "" + upVoteColor }}
            className="fa fa-arrow-up fa-2x"
            title="This content benefits our species"
            aria-hidden="true"
            onClick={e => {
              e.preventDefault();
              this.clickedUpDownVote(true);
            }}
          /> */}
        {voteDiff !== 0 && (voteDiff > 0 ? "+" : "-")}
        {voteDiff}
        {/* <i
            style={{ cursor: "pointer", color: "" + downVoteColor }}
            className="fa fa-arrow-down fa-2x"
            title="This content does not do a good job"
            aria-hidden="true"
            onClick={e => {
              e.preventDefault();
              this.clickedUpDownVote(false);
            }}
          /> */}
        <Icon
          style={{ cursor: "pointer" }}
          color={downVoteColor}
          name="angle down"
          size="big"
          onClick={e => {
            e.preventDefault();
            this.clickedUpDownVote(false);
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  uservotes: state.userdata.uservotes
});

export default connect(
  mapStateToProps,
  { createUpDownVote }
)(CreateUpDownVote);
