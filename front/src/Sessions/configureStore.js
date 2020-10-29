import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';
import promiseMiddleware from './promiseMiddleware.js';

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(promiseMiddleware));
  return createStore(reducer, initialState, enhancer);
}