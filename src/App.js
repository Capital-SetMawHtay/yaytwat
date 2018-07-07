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
<<<<<<< HEAD
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={props => <div>Home Page </div>} />
            <Route path="/login" exact render={props => <div>Log In Page </div>} />
          </Switch>
        </BrowserRouter>
      </Provider>     
    );
  }
=======
import { ThemeProvider } from 'react-jss';
import store from './store';
import Auth from './components/Auth';
import Home from './components/Home';

const theme = {
  colorPrimary: '#F06292',
  colorSecondary: '#e0e0e0',
};

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
>>>>>>> 81168a6547077f976b8430fd1aae052c54135ed4
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
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  </ThemeProvider>
);

export default Container;
