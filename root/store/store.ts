// This is where the store is setup. This is where redux updates the state of the store based on the user actions.
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import runloop from '@/reducers/runloop';


// const loggerMiddleware = createLogger();

// export const store = createStore(runloop, applyMiddleware(thunkMiddleware, loggerMiddleware));
export const store = createStore(runloop, applyMiddleware(thunkMiddleware));