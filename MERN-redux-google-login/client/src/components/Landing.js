import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

class Landing extends Component {
  render() {
    return (
      <div>
        <a href="/auth/google">
          <Button color="red">Enter Brcks</Button>
        </a>
        <br />
        <Link to="/faq">
          <b>FAQ</b>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
