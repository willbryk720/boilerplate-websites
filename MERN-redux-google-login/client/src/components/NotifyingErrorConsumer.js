import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { consumeNotifyingError } from "../actions/Events/errorActions";

import { toast } from "react-toastify";

class NotifyingErrorConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // remove error event if it exists
    const { errorList } = this.props.errors;

    errorList.forEach(error => {
      console.log("the error:", error);

      // hacky way to avoid the multiple not logged in bug, in which the user gets send multiple Not logged in notifications
      if (error.errorMsg != "Not logged in") {
        toast.error(error.errorMsg, {
          position: toast.POSITION.TOP_CENTER
        });
      }

      this.props.consumeNotifyingError(error);
    });

    return <div />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { consumeNotifyingError }
)(NotifyingErrorConsumer);
