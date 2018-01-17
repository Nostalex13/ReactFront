import { combineReducers, } from 'redux';
import routes from './routesReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
	routes,
	auth,
});

export default rootReducer;
