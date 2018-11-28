import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({error}));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page}} });
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    //console.log(result);
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >Search </Search>   
        </div>
        { error 
          ? <div className="interactions"><p>Something went wrong.</p></div>
          : <Table 
            list={list}
            onDismiss={this.onDismiss}
        />}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>    
        <hr />
        <small>React version {React.version}</small>
      </div>
    );
  }
}

/*
// below is a more concise ES6esque version
function Search({ value, onChange, children }) {
    return (
      <form>
        {children}
        <input type="text" value={value} onChange={onChange} />
      </form>
    );
}*/

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>

// refactored to functional stateless component below
/* 
class Table extends Component {
  render() {
    const {list, pattern, onDismiss} = this.props;

    return (
      <div>
      {list.filter(isSearched(pattern)).map(
        item => {
          return (
            <div key={item.objectID}>
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span><Button
                onClick={() => onDismiss(item.objectID)}
              >Dismiss</Button></span>
            </div>
          )
        }
      )}
      </div>
    );
  }
} */

const largeColumn   = { width: '40%' };
const midColumn     = { width: '30%' };
const smallColumn   = { width: '10%' };

const Table = ({list, onDismiss}) =>
    <div className="table">
    {list.map(
      item => {
        return (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}><a href={item.url}>{item.title}</a></span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}><Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >Dismiss</Button></span>
          </div>
        )
      }
    )}
    </div>

//refactored to functional stateless component below
/*
class Buttonn extends Component {
  render() {
    const {
      onClick,
      className = '',
      children
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}
*/


const Button = ({onClick, className = '', children}) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>



export default App;
