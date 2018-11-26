# 01 Introduction To React

  * Javascript library for rendering interfaces
  * JSX
  * React syntax
  * ReactDOM


## Hi, my name is React

A "V" in MVC, released by Facebook in 2013. Mostly used to build SPAs.

### Requirements
  * node v10.11.0
  * npm  v6.4.1

### Node & NPM

`npm install -g <package>` installs a package to be avilable globally.

`npm install react` will install react in the current local directory, inside of `node_modules` directory & will reference it within `package.json`.

`npm init -y` will initialize the `node_modules` and `package.json` for the project. The `-y` flag initializes the `package.json` with defaults. 

`package.json` contains the dependencies, so the project can be shared without all the node modules included. Other developers can then just run `npm install` which will install necessary modules using references in `package.json`.

`npm install --save-dev <package>` makes the installed package used only in development, without adding it to deployment to production. Useful for testing.


## Installation

  1. Using a CDN, by placing react Javascript files within the HTML page's `<script>` tags
  2. Using `npm install react react-dom` for npm managed application

[Babel](https://babeljs.io/) might be needed for using JSX & ES6 features.

## Zero Configuration Install

Uses [Facebook's create-react-app](https://github.com/facebook/create-react-app).

```
npm install -g create-react-app
```

The `create-react-app` comes with several scripts:

  * `npm start` will run the app on `localhost:3000`
  * `npm test` runs the tests
  * `npm build` creates rendered `build/` directory which can be used for [deployment](https://www.robinwieruch.de/deploy-applications-digital-ocean/)


## Introduction to JSX

Components are created as ES6 classes, extending React's `Component` class.

```
import React, {Component} from 'react';

class App extends Component { ... } 
```

Component is instantiated (used) as follows:

```
<App />
```

Returned element is specified in the `render()` method.

### Additional reading 
  * [Read here about supported HTML attributes in JSX](https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes) 
  * [React components, elements and instances](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## ES6 `const` and `let`

React embraces immutability, which these keywords serve better than `var` keyword. `const` can't be reassigned, and both are lexically scoped.

## ReactDOM

```
ReactDOM.render( < App />, document.getElementById(' root') );
```

It uses a DOM node in the HTML to replace it with rendered React components/elements. It takes two params, first being the Component, or JSX, and second is the DOM node to use for rendering.


## Hot Module Replacement

Using hot module replacement makes the page made by `create-react-app` refresh update time the source files are modified. It reloads the application in the browser without page refresh.

```
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './ index.css'; 
import App from './ App'; 

ReactDOM.render( < App />, document.getElementById(' root') ); 

if (module.hot) { module.hot.accept(); }

```

[Presentation Video on HMR](https://www.youtube.com/watch?v=xsSnOQynTHs)

## Complex Javascript in JSX

Javascript and JSX can be mixed and matched. For example, given a list of elements, it's possible to do the following:

```
class App extends Component { 
  render() { 
    return ( 
      <div className="App"> 
        { list.map( function(item) { 
          return ( 
            <div key={item.objectID}> 
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span> 
            </div>); 
          })} 
        </div>
      ); 
    } 
  } 
export default App;
```

Assigning the  `key` property helps React identify which element to update when they change.