import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var helloworld = "Welcome to the Road to learn React";
    var User = {
      name: {
        first: "Saša",
        last: "Mataić"
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{helloworld}</h1>
          <h2>User: {User.name.first} {User.name.last}</h2>
          <p>
            Edit <code>src/App.js</code> and save to reload. Yay!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
