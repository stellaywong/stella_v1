import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Tabs from './Tabs';
import Weather from './components/weather';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root");

    const Hello = <h1>Hello from React!</h1>

    ReactDOM.render(
        <div>
            <Clock />
            <Tabs />
            <Weather />
        </div>, root);
});