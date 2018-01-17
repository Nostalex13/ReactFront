import { createStore, applyMiddleware, } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			reduxImmutableStateInvariant(),
			thunkMiddleware,
			logger,
		)
	);
}
