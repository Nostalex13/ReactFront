import AUTH_ACTIONS from '../constants/authActionsConstants';
import authApi from '../api/authApi';

export const loginSuccess = () => ({ type: AUTH_ACTIONS.LOG_IN_SUCCESS, });

export const login = credentials =>
	dispatch =>
		authApi.login(credentials)
			.then((response) => {
				sessionStorage.setItem('jwt', response.jwt);
				dispatch(loginSuccess());
			})
			.catch((error) => {
				throw (error);
			});

export const logOutUser = () => {
	sessionStorage.removeItem('jwt');
	return { type: AUTH_ACTIONS.LOG_OUT, };
};
