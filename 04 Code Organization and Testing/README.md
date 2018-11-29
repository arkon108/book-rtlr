# 04 Code Organization and Testing

Covers the best practices of structuring files and folders, and also covers testing & debugging practices.

Test excercises were done in [../03 Getting Real with APIs/excercise/src/App.test.js]

## Snapshot testing with Jest

Jest is JS testing framework used by Facebook. It's used for component tests & comes with CRA.

  * `it` block describes one test case
  * `describe` block defines the test suite

Jest creates snapshots of components and run tests against future versions of the snapshot.

Before writing tests, it's necessary to install Jest's utility library with

`npm install --save-dev react-test-renderer`

Snapshot tests usually stay very basic, what we're looking for is to ensure that component output stays the same.

[Additional reading about Jest in React](https://jestjs.io/docs/en/tutorial-react);

## Unit tests with Enzyme

Made by Airbnb, [Enzyme](https://github.com/airbnb/enzyme) is a testing utility to assert, manipulate and traverse React components.

Installation:

```
npm install --save-dev enzyme react-addons-test-utils enzyme-adapter-react-16
```

`shallow` renders element without it's children components. Rules of thumb for using Enzyme rendering methods:

  * always begin with `shallow`
  * if `componentDidMount()` or `componentDidUpdate()` need to be tested - use `mount()`
  * if component lifecycle and children behavior need to be tested, use `mount()`
  * if component children need to be tested and there's no need for lifecycle methods, use `render()`

### Additional reading
[Enzyme documentation](https://github.com/airbnb/enzyme).

[React testing tutorial](https://www.robinwieruch.de/react-testing-tutorial/)


## Component interface with PropTypes

PropTypes are used to describe Component interface, to prevent bugs by type checking.

Basic PropTypes:

  * PropTypes.array
  * PropTypes.bool
  * PropTypes.func
  * PropTypes.number
  * PropTypes.object
  * PropTypes.string

React object PropTypes:

  * PropTypes.node - renderable fragment
  * PropTypes.element - React element

The array PropType can be additionally specified:

```
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};
```

Instead of method param defaults, it's possible to set the default parameter by using `defaultProps`:

```
Button.defaultProps = {
  className: '',
};
```

Read about [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

## Debugging with React Developer Tools

This [extension](https://github.com/facebook/react-devtools) enables code inspecting and debugging.

Read more about [debugging Javascript functions in the browser](https://developers.google.com/web/tools/chrome-devtools/javascript/). Also read about and use [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)