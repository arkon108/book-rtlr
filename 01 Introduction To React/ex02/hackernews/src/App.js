import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const list = [
  {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0
  },
  {
    title: "Redux",
    url: "https://reductjs.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
},
];

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({
      list: updatedList,
      searchTerm: ''
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

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
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>

        {this.state.list.filter(isSearched(this.state.searchTerm)).map(
          item => {
            return (
              <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span><button
                  onClick={() => this.onDismiss(item.objectID)}
                >Dismiss</button></span>
              </div>
            )
          }
        )}
        <hr />
        <div>React version {React.version}</div>
      </div>
    );
  }
}

export default App;
