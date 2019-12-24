import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { handleInitialData } from '../actions/shared';
import Routes from './Routes';
import NavBar from './NavBar';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { isLogged } = this.props;

    return (
      <Router>
        <div className={isLogged ? 'main-container' : 'login-container'}>
          {isLogged && <NavBar />}
          <Routes isLogged={isLogged} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired
};

function mapStateToProps({ authedUser }) {
  return {
    isLogged: authedUser !== null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
