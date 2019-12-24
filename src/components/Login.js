import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthedUser } from '../actions/authedUser';
import { Dropdown } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '' };
  }

  handleChangeUser = (e, data) => {
    this.setState({ userId: data.value });
  };

  handleSubmit = event => {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      authenticate(userId);
    } else {
      alert('Please select a user before.');
    }
    event.preventDefault();
  };

  setUserOptions = users => {
    return Object.keys(users).map(key => ({
      key: users[key].id,
      text: users[key].name,
      value: users[key].id,
      image: { avatar: true, src: users[key].avatarURL }
    }));
  };

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    return (
      <Fragment>
        <h1 className="welcome">Welcome to the Would You Rather App</h1>
        <h2>Please sign in to continue</h2>
        <form onSubmit={this.handleSubmit}>
          <Dropdown
            placeholder="Select User"
            fluid
            selection
            onChange={this.handleChangeUser}
            options={this.setUserOptions(users)}
          />
          <input
            className="submitUser"
            disabled={userId === ''}
            type="submit"
            value="Sign In"
          />
        </form>
      </Fragment>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired
};

function mapStateToProps({ users }) {
  return {
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: id => {
      dispatch(setAuthedUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
