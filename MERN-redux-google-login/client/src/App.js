import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// For redux stuff
import { connect } from "react-redux";

// To block out users when not logged in. Not sure if this is necessary because of google login
// as opposed to traversy's email login
import PrivateRoute from "./components/common/PrivateRoute";

import Landing from "./components/Landing";
import FAQ from "./components/FAQ";

// import NotifyingEventsConsumer from "./components/NotifyingEventsConsumer";
// import NotifyingErrorConsumer from "./components/NotifyingErrorConsumer";

import { fetchUser, getUserData } from "./actions";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // minified version is also included
// // import 'react-toastify/dist/ReactToastify.min.css';

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getUserData();
  }

  render() {
    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/faq" component={FAQ} />

          {/* <Switch>
            <PrivateRoute path="/textbooks" component={TextbooksLayout} />
          </Switch>
          <Switch>
            <PrivateRoute
              path="/dashboard/:textbookID"
              component={LoadingTextbook}
            />
          </Switch>
          <ToastContainer />
          <NotifyingEventsConsumer />
          <NotifyingErrorConsumer /> */}
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { fetchUser, getUserData }
)(App);
