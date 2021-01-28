import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger();

export default function configureStore() {
  const store = createStore(
    modules /* preloadedState, */,
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
  );
  return store;
}
