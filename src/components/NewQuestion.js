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

  handleOptionOneChange = event => {
    event.preventDefault();
    this.setState({
      optionOne: event.target.value
    });
  };

  handleOptionTwoChange = event => {
    event.preventDefault();
    this.setState({
      optionTwo: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        <p>Would You Rather</p>

        <label for="optionOne">Option One</label>
        <input
          type="text"
          name="optionOne"
          value={optionOne}
          onChange={this.handleOptionOneChange}
          placeholder="Option One"
        />

        <label for="optionTwo">Option Two</label>
        <input
          type="text"
          name="optionTwo"
          value={optionTwo}
          onChange={this.handleOptionTwoChange}
          placeholder="Option Two"
        />

        <button disabled={optionOne === '' || optionTwo === ''}>Submit</button>
      </form>
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
