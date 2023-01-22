import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
//import AuthProvider from './component/store/AuthProvider'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from  './component/store/AuthRedux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><Provider 
 store={store}><App /></Provider></BrowserRouter>);