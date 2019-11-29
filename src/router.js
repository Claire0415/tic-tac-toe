import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Container from './routes/Container';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/con" exact component={Container} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
