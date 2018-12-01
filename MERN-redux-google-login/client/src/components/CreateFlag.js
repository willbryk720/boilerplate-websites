import React, { Component } from "react";
import { connect } from "react-redux";
import { createMetamoduleThought } from "../actions/LearningAids/learningAidActions";
import PropTypes from "prop-types";

import axios from "axios";

import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Radio,
  TextArea,
  Checkbox,
  Dropdown
} from "semantic-ui-react";

import { toast } from "react-toastify";

class CreateFlag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      checkedValues: [],
      textArea: "",
      dataID: props.dataID,
      contentType: props.contentType,
      isFlagLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  resetFlag() {
    toast.success(
      "Successfully flagged content. We will investigate whether this content violates site rules",
      {
        position: toast.POSITION.TOP_CENTER
      }
    );
    this.handleClose();
  }

  onSubmit() {
    const flagData = {
      dataID: this.state.dataID,
      flagTypes: this.state.checkedValues,
      textArea: this.state.textArea,
      contentType: this.state.contentType
    };
    console.log("Submitting flag", flagData);

    axios.post("/api/flags", flagData).then(res => {
      this.resetFlag();
      console.log(res);
    });
    this.setState({ isFlagLoading: true });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () =>
    this.setState({
      modalOpen: false,
      checkedValues: [],
      textArea: "",
      isFlagLoading: false
    });

  // handleChange = (e, { value }) => this.setState({ radioValue: value });

  handleChange = (e, { value }) => {
    if (this.state.checkedValues.includes(value)) {
      this.setState({
        checkedValues: this.state.checkedValues.filter(cV => cV !== value)
      });
    } else {
      this.setState({ checkedValues: [...this.state.checkedValues, value] });
    }
  };

  onChangeTextArea = (e, { value }) => {
    this.setState({ textArea: value });
  };

  render() {
    return (
      <Modal
        trigger={
          <Dropdown.Item onClick={this.handleOpen}>
            Flag
            <Icon name="flag" />
          </Dropdown.Item>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Modal.Header>Report Bad Content</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              Reporting inappropriate content helps ensure brcks provides a
              supreme experience for users. Thank you for doing your part!
            </p>
            <br />
          </Modal.Description>
          <Form>
            <Form.Field>Selected value:</Form.Field>
            <Checkbox
              label="Inappropriate Image"
              value="bad_image"
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.checkedValues.includes("bad_image")}
            />{" "}
            <br />
            <br />
            <Checkbox
              label="Inappropriate Language"
              value="bad_language"
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.checkedValues.includes("bad_language")}
            />
            <br />
            <br />
            <Checkbox
              label="Offensive or Aggressive Language"
              value="offensive"
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.checkedValues.includes("offensive")}
            />
            <br />
            <br />
            <Checkbox
              label="This shouldn't be here"
              value="bad_placement"
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.checkedValues.includes("bad_placement")}
            />
            <br />
            <br />
            <Checkbox
              label="Violating school policy"
              value="school"
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.checkedValues.includes("school")}
            />
            <br />
            <br />
            <TextArea
              placeholder="Please elaborate if necessary"
              rows="2"
              onChange={this.onChangeTextArea}
            />
            <br />
            <br />
            <br />
            <Button
              onClick={() => !this.state.isFlagLoading && this.onSubmit()}
              color="red"
              loading={this.state.isFlagLoading}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

// export default connect(
//   null,
//   { createFlag }
// )(CreateFlag);

export default CreateFlag;
