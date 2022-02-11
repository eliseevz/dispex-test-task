import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "./store/createStore";
import {Provider} from "react-redux";

const store = createStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root')
);

reportWebVitals();
