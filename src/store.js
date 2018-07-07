import {
  createStore,
  applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const middleware = composeWithDevTools(applyMiddleware(
  sagaMiddleware,
  createLogger({ collapsed: true }),
));
const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
