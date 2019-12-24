import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends Component {
  goToQuestion = (e, questionId) => {
    let path = `/questions/` + questionId;
    this.props.history.push(path);
  };

  render() {
    const { question, auth, users } = this.props;
    return (
      <div
        className="questionCard"
        onClick={e => this.goToQuestion(e, question.id)}
      >
        <p>{users[question.author].name} ask:</p>
        <div className="avatarQuestion">
          <img src={users[question.author].avatarURL} alt="avatar" />
          <ul>
            <p>Would You Rather...</p>
            <li
              className={
                question.optionOne.votes.includes(auth) ? 'optionSelected' : ''
              }
            >
              {question.optionOne.text}
            </li>
            <li
              className={
                question.optionTwo.votes.includes(auth) ? 'optionSelected' : ''
              }
            >
              {question.optionTwo.text}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    auth: state.authedUser,
    users: state.users
  };
}

export default withRouter(connect(mapStateToProps, null)(Question));
