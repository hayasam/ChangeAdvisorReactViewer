import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import AppRouter from "./AppRouter";
import './AppRouter.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
