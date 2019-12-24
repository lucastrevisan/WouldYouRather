import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import User from './User';

class Nav extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <nav className="navigation">
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink exact to="/add">
          New Question
        </NavLink>
        <NavLink exact to="/leaderboard">
          Leaderboard
        </NavLink>
        <User id={authedUser} />
        <NavLink exact to="/logout">
          Logout
        </NavLink>
      </nav>
    );
  }
}

Nav.propTypes = {
  authedUser: PropTypes.string
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps, null)(Nav));
