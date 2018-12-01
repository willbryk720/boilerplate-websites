import React from "react";
import PropTypes from "prop-types";

import { Loader } from "semantic-ui-react";

function CircularLoading(props) {
  if (props.size) {
    return <Loader active inline size={props.size} />;
  } else {
    return (
      <div>
        <Loader active inline />
      </div>
    );
  }
}

export default CircularLoading;
