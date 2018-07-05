import React, { Component } from 'react';
import {
  Provider,
  connect,
} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import store from './store';
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
  );
}

function PublicRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (!user
        ? <Component {...props} />
        : <Redirect to="/home" />)}
    />
  );
}


const App = props => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/" exact component={Auth} user={props.user} />
      <PrivateRoute path="/home" exact component={Home} user={props.user} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Container = props => (
  <Provider store={store}>
    <WrappedApp />
  </Provider>
);

export default Container;
