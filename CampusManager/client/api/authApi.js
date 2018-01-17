import axios from 'axios';
import API_CONSTANTS from '../constants/apiConstants';

class AuthApi {
	static login(credentials) {
		return axios.post(`${API_CONSTANTS.HOST}:${API_CONSTANTS.PORT}${API_CONSTANTS.LOGIN}`, { params: credentials, } )
			.then(response => response.json())
			.catch(error => error);
	}
}

export default AuthApi;
