import { createStore, combineReducers, applyMiddleware } from 'redux';
import { homeReducer as home } from './ducks/home';
import { authReducer as user } from './ducks/auth';

const reducer = combineReducers({
  user,
  home,
});

// const store = createStore(reducer, middleware);

export default reducer;
