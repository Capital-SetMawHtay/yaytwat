import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }
      }
    />
  )
}

function PublicRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (!user
        ? <Component {...props} />
        : <Redirect to="/home" />)}
    />
  )
}


const App = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/" exact component={Auth} />
          <PrivateRoute path="/login" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
