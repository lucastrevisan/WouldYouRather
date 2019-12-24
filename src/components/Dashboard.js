import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { connect } from 'react-redux';

class DashBoard extends Component {
  state = {
    active: 'unanswered'
  };

  toggle(tab) {
    if (this.state.active !== tab) {
      this.setState({
        active: tab
      });
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    const { active } = this.state;
    return (
      <Fragment>
        <ul className="tabs">
          <li
            className={active === 'unanswered' ? 'active' : ''}
            onClick={() => {
              this.toggle('unanswered');
            }}
          >
            Unanswered
          </li>
          <li
            className={active === 'answered' ? 'active' : ''}
            onClick={() => {
              this.toggle('answered');
            }}
          >
            Answered
          </li>
        </ul>

        <ul className={`unanswered active_${active}`}>
          {unansweredQuestions.map(qid => (
            <li key={qid}>
              <Question id={qid} />
            </li>
          ))}
        </ul>

        <ul className={`answered active_${active}`}>
          {answeredQuestions.map(qid => (
            <li key={qid}>
              <Question id={qid} />
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  };
}

export default connect(mapStateToProps)(DashBoard);
