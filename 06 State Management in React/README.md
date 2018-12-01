# 06 State Management in React

  * best practices
  * considerations for using a 3rd-party library

## Lifting state

Lifting state is moving the substate from one component to another. The book example deals with moving the state from App to Table component, parent to child. 

  * read about [lifting state up](https://reactjs.org/docs/lifting-state-up.html)
  * learn about lifting state in [learn React before learning Redux](https://www.robinwieruch.de/learn-react-before-using-redux/)


## Revisited setState()

Besides taking an object to update the state, `setState()` can also take a function.

```
    this.setState((prevState, props) => {
        ...
    });
```

Using a function makes sense where updating state depends on the previous state or props.

  * Read about [using the state correctly](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)
  * Read about [external state management](https://www.robinwieruch.de/redux-mobx-confusion/)