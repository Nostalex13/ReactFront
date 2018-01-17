import { browserHistory, } from 'react-router';
import AUTH_ACTIONS from '../constants/authActionsConstants';

const auth = (
	state = {
		authKey: null,
		isAuthenticated: false,
	},
	action
) => {
	/* eslint-disable indent */
	switch (action.type) {
		case AUTH_ACTIONS.LOG_OUT:
		case AUTH_ACTIONS.LOG_IN_SUCCESS:
			return Object.assign({}, state, {
				authKey: sessionStorage.jwt,
				isAuthenticated: !!sessionStorage.jwt,
			});
		default:
			return state;
	}
};

export default auth;
