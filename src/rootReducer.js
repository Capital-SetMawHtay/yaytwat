import { createStore, combineReducers, applyMiddleware } from 'redux';
import { homeReducer } from './ducks/home';

const reducer = combineReducers({
  homeReducer,
});

// const store = createStore(reducer, middleware);

export default reducer;
