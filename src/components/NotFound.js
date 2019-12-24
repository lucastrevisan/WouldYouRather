import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ history }) => (
  <div>
    <h1>404</h1>
    <p>Page Not Found</p>
    <button size="small" color="primary" onClick={() => history.push('/')}>
      Go Home
    </button>
  </div>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default NotFound;
