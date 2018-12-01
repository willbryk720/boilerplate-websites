import React, { Component } from "react";
import { connect } from "react-redux";

import { Dropdown, Button } from "semantic-ui-react";

import { logoutUser } from "../actions";

import SmoothCollapse from "react-smooth-collapse";

import "../css/FAQ.css";

const QuestionAnswers = [
  {
    title: "Where am I",
    questions: [
      {
        question: "What is internetTreasures?",
        answer: `blah blah.`
      },
      {
        question: "How does it work?",
        answer: (
          <div className="youtube-container">
            <iframe
              className="youtube-embed"
              src="https://www.youtube.com/embed/JFgLJdv5D1I"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        )
      }
    ]
  },

  {
    title: "Rules for using the site",
    questions: [
      {
        question: "Who can post?",
        answer: `Anyone can, as long as you have something helpful to contribute! A question, answer, explanation, example problem, example solution, or a thought can definitely help someone else out there.`
      },
      {
        question: "Is any content allowed?",
        answer: `Users are forbidden from posting copyrighted material. This would include things like: snippets from the textbook, copyrighted explanations found online, or homework problems from school. Any content on the site is in the public domain.`
      }
    ]
  }
];

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedList: []
    };
  }

  toggleCollapsible = collapseID => {
    if (this.state.expandedList.includes(collapseID)) {
      this.setState({
        expandedList: this.state.expandedList.filter(id => id !== collapseID)
      });
    } else {
      this.setState({ expandedList: [...this.state.expandedList, collapseID] });
    }
  };

  render() {
    const dropdownItem = this.props.auth && (
      <div className="dropdown-gear">
        <Dropdown icon="setting" direction="left">
          <Dropdown.Menu>
            <Dropdown.Item
              text="Logout"
              onClick={() => {
                this.props.logoutUser();
                this.props.history.push("/");
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );

    const enterButton = !this.props.auth && (
      <div style={{ textAlign: "center" }}>
        <br />
        <a href="/auth/google">
          <Button color="red">Enter Brcks</Button>
        </a>
      </div>
    );

    const faqItems = (
      <div>
        {QuestionAnswers.map((titleAndQuestions, index) => {
          const titleCollapsibleID = "t" + index;

          const titleAndQuestionsItems = titleAndQuestions.questions.map(
            (qAndA, questionIndex) => {
              const questionCollapsibleID =
                titleCollapsibleID + "-q" + questionIndex;
              return (
                <div
                  className="faq-collapsible-level2"
                  key={questionCollapsibleID}
                >
                  <h3
                    className="faq-collapsible-header2"
                    onClick={() =>
                      this.toggleCollapsible(questionCollapsibleID)
                    }
                  >
                    {qAndA.question}
                  </h3>
                  <SmoothCollapse
                    expanded={this.state.expandedList.includes(
                      questionCollapsibleID
                    )}
                  >
                    <div className="faq-answer-content">{qAndA.answer}</div>
                    <br />
                  </SmoothCollapse>
                </div>
              );
            }
          );

          return (
            <div key={titleCollapsibleID}>
              <h2
                className="faq-collapsible-header"
                onClick={() => this.toggleCollapsible(titleCollapsibleID)}
              >
                {titleAndQuestions.title}
              </h2>
              <SmoothCollapse
                expanded={this.state.expandedList.includes(titleCollapsibleID)}
              >
                <div>{titleAndQuestionsItems}</div>
              </SmoothCollapse>
              <hr />
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="faq-container">
        {dropdownItem}
        <br />
        <div style={{ textAlign: "center" }}>
          <h1>FAQ</h1>
        </div>
        <br />
        <div className="faq-description-container">
          <br />
          <div className="faq-description">
            {faqItems}
            {enterButton}
          </div>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(FAQ);
