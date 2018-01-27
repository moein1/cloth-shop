import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider } from 'react-redux';
import {createStore ,compose ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './styles/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers/clothBuilder';

const copmoseEnhancers = 
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || 
compose;

const store = createStore(reducer ,copmoseEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store =  {store} >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
