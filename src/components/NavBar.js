import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import User from './User';

class NavBar extends PureComponent {
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
      <nav>
        <Link to="/">Would You Rather</Link>

        <Link to="/add">New Question</Link>
        <Link to="/leaderboard">Dashboard</Link>
        <Link to="/logout">Logout</Link>

        <User id={authedUser} />
      </nav>
    );
  }
}

NavBar.propTypes = {
  authedUser: PropTypes.string
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
