import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirect: false
  };

  handleChange = (event, option) => {
    event.preventDefault();
    this.setState({
      [option]: event.target.value
    });
  };

  handleSubmit = () => {
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <div className="questionCard selected">
        <p>Would You Rather</p>
        <div className="avatarQuestion">
          <ul className="alone">
            <li>
              <input
                type="text"
                name="optionOne"
                className="questionToAsk"
                value={optionOne}
                onChange={e => this.handleChange(e, 'optionOne')}
                placeholder="Option One"
              />
            </li>
            <li>OR</li>
            <li>
              <input
                type="text"
                name="optionTwo"
                className="questionToAsk"
                value={optionTwo}
                onChange={e => this.handleChange(e, 'optionTwo')}
                placeholder="Option Two"
              />
            </li>
            <li>
              <button
                onClick={this.handleSubmit}
                disabled={optionOne === '' || optionTwo === ''}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  };
}

export default connect(null, mapDispatchToProps)(NewQuestion);
