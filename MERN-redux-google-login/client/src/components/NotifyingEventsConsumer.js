import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { consumeNotifyingEvent } from "../actions/Events/eventActions";

import { toast } from "react-toastify";

class NotifyingEventsConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // remove create event if it exists
    const eventsForNotifyingList = this.props.eventsForNotifyingList;

    eventsForNotifyingList.forEach(event => {
      let eventMessage;
      switch (event.type) {
        case "delete-response":
          eventMessage = "Successfully deleted your response";
          break;
        case "delete-question":
          eventMessage = "Successfully deleted your question";
          break;
        case "delete-moduleInstance":
          eventMessage = "Successfully deleted your module";
          break;
        case "create-question":
          eventMessage = "Successfully created your question!";
          break;
        case "create-response":
          eventMessage =
            "Success! Thanks for responding to the question, and for helping someone out there climb the mountain of human knowledge!";
          break;
        case "edit-question":
          eventMessage = "Successfully edited your question";
          break;
        case "edit-response":
          eventMessage = "Successfully edited your response";
          break;
        case "delete-solution":
          eventMessage = "Successfully deleted your response";
          break;
        case "delete-example":
          eventMessage = "Successfully deleted your example";
          break;
        case "delete-moduleInstance":
          eventMessage = "Successfully deleted your module";
          break;
        case "create-example":
          eventMessage = "Successfully created your example!";
          break;
        case "create-solution":
          eventMessage =
            "Success! Thanks for responding to the example, and for helping someone out there climb the mountain of human knowledge!";
          break;
        case "edit-example":
          eventMessage = "Successfully edited your example";
          break;
        case "edit-solution":
          eventMessage = "Successfully edited your solution";
          break;
      }

      toast.success(eventMessage, {
        position: toast.POSITION.TOP_CENTER
      });

      this.props.consumeNotifyingEvent(event);
    });

    return <div />;
  }
}

const mapStateToProps = state => ({
  eventsForNotifyingList: state.events.notifyingEvents.eventsForNotifyingList
});

export default connect(
  mapStateToProps,
  { consumeNotifyingEvent }
)(NotifyingEventsConsumer);
