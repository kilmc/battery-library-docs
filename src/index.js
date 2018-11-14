import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './App';
import config from './config/battery.config';

ReactDOM.render(<Docs config={config} />, document.getElementById('root'));
