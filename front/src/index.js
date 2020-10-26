import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import {Provider} from 'react-redux';
import configureStore from 'Sessions/configureStore.js';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);

