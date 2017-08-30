import React from 'react';
import ReactDOM from 'react-dom';
import './Index.css';
import App from './App';

const HelloWorld = () =>
    <h1>Hello World!</h1>

ReactDOM.render(<App />, document.getElementById('app'));