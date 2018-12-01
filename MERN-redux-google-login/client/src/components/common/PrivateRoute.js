import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component: Component, auth, ...rest } = this.props;
    console.log("Private Router", auth);
    return (
      <Route
        {...rest}
        render={props =>
          auth ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
