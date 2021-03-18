import React from 'react';
import logo from './logo.svg';
import './App.css';
const appVersion = window.require('electron').remote.app.getVersion()

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h3>Welcome to that Electron tutorial</h3>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React and Electron
                </a>
                <h3>{appVersion}</h3>
            </header>
        </div>
    );
}

export default App;
