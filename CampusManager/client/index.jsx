import 'babel-polyfill';
import React from 'react';
import { render, } from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { Provider, } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore();

render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('app')
);
