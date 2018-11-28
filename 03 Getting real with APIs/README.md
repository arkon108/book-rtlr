# 03 Getting real with APIs

This chapter will use the [basic](https://github.com/HackerNews/API) and [search](https://hn.algolia.com/api) APIs for hackernews.

## Lifecycle methods

These can be used in class components. `constructor()` and `render()` are two of these. 

  * `constructor` is called only once - when a component is created and inserted into DOM, the process of component instatiating is called mounting
  * `render` is called during mounting, and every time the state or props of the component change

The mounting process 4 lifecycle methods called as follows:

  1. constructor()
  2. getDerivedStateFromProps()
  3. render()
  4. componentDidMount()

Update lifecycle is when the state or props change. It consists of these 5 methods:

  1. getDerivedStateFromProps()
  2. shouldComponentUpdate()
  3. render()
  4. getSnapshotBeforeUpdate()
  5. componentDidUpdate()

There's also unmounting lifecycle with a single method - `componentWillUnmount()`

### Additional reading

  * [lifecycle methods](https://reactjs.org/docs/react-component.html)
  * [state and lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
  * [error handling in components](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

## Fetching data

[How to fetch data in React](https://www.robinwieruch.de/react-fetching-data/)

## Conditional rendering

The decision to render one of multiple elements, most commonly whether to render an element or nothing. If/else statements don't work in JSX, but ternary operator and logical `&&` do. [Different ways](https://www.robinwieruch.de/conditional-rendering-react/) of [conditional rendering in React](https://reactjs.org/docs/conditional-rendering.html).

## Error Handling

An error is just another state of the component, and displayed using conditional rendering. 
Also, read about [error handling in React](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).