import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const SORTS = {
  NONE:     list => list,
  TITLE:    list => sortBy(list, 'title'),
  AUTHOR:   list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS:   list => sortBy(list, 'points').reverse()
};


class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {

    this.setState({ isLoading: true });

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

    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page}}, isLoading: false });
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
    const { searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;
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
            sortKey={sortKey}
            onSort={this.onSort}
            onDismiss={this.onDismiss}
            isSortReverse={isSortReverse}
        />}
        <div className="interactions">
          
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>    
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

class Search extends Component {

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (<form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} ref={el => this.input = el}/>
      <button type="submit">{children}</button>
    </form>);
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node
};
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

const Table = ({list, sortKey, onSort, isSortReverse, onDismiss}) => {

  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse 
    ? sortedList.reverse() 
    : sortedList;

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>
          <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>Title</Sort>
        </span>
        <span style={midColumn}>
          <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>Author</Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>Comments</Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>Points</Sort>
        </span>
        <span style={smallColumn}>
          Archive
        </span>
      </div>
      {reverseSortedList.map(
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
    </div>);
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

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


const Button = ({onClick, className, children}) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

Button.defaultProps = {
  className: ''
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};


export default App;
export { 
  Button,
  Search,
  Table
}

const Loading = () => 
  <div><span className="fas fa-sync fa-spin"></span></div>

/* a higher order component */
const withLoading = (Component) => ({isLoading, ...rest}) => 
  isLoading
  ? <Loading />
  : <Component {...rest} />

const ButtonWithLoading = withLoading(Button);

const Sort = ({ sortKey, activeSortKey, onSort, children}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );
  
  return (
  <Button onClick={() => onSort(sortKey)} className={sortClass}>
    { children }
  </Button>)
}