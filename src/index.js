import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';
import './css/fonts.css';
import './css/frame.css';
import './css/alerts.css';
import './css/components/App.css';
import './css/components/FormWizard.css';
import './css/components/FormWizard.Types.css';
import './css/components/FormWizard.Inputs.css';
import './css/icon-packages/elegant-icons/min.css';
import './css/icon-packages/font-awesome-v4/min.css';
//import './css/icon-packages/font-awesome-v5/all.min.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
