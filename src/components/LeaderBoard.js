import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Leaderboard(props) {
  const { users } = props;
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan="2">Rank</th>
          <th rowSpan="2">Avatar</th>
          <th rowSpan="2">User</th>
          <th colSpan="2">Questions</th>
        </tr>
        <tr>
          <th>Asked</th>
          <th>Answered</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>
              <img
                src={user.avatarURL}
                className="avatar"
                alt={`${user.name}`}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.questions.length}</td>
            <td>{Object.keys(user.answers).length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  };
};

export default connect(mapStateToProps)(Leaderboard);
