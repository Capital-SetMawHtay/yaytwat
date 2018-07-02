import React, { Component } from 'react';
import {
  Provider
} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
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
}

export default App;
