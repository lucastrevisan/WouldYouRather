import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import QuestionDetails from './QuestionDetails';
import NotFound from './NotFound';
import Logout from './Logout';

function Routes(props) {
  return (
    <Switch>
      {props.isLogged ? (
        <Fragment>
          <Route path="/" exact component={Dashboard} />
          <Route path="/leaderboard" exact component={LeaderBoard} />
          <Route path="/add" component={NewQuestion} />
          <Route path="/questions/:id" component={QuestionDetails} />
          <Route exact path="/logout" component={Logout} />
        </Fragment>
      ) : (
        <Route path="/" exact component={Login} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = { isLogged: PropTypes.bool };

export default Routes;
