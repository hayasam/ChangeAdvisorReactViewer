import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import AppRouter from "./AppRouter";

ReactDOM.render((
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
