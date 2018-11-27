# 02 Basics in React

  * Different ways to instantiate Components
  * Component state & interaction
  * Component composability & reusability

## Local component state

It's the internal component state, and it enables us to save, modify and delete the state stored in the component.
Example:

```
const list = [
    {
        title: "React",
        url: "https://reactjs.org",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    ...
];

class App extends Component {
    constructor(props) {
        super(props); // the base class sets props to this.props

        this.state = {
            list: list
        };
    }
    ...
}
```

Note that every time the state of the component changes, the `render()` method will be called again. 

The state should not be modified directly, but by using `setState()` method.


## ES6 Object Initializer

Shorthand syntax for initializing objects more concisely. E.g.

```
// ES5
var name = "STM";
var user = {
    name: name,
}
// the above be shortened to the following, when the property name is the same as variable name used

// ES6
const name = "STM";
const user = {
    name,
}
```

Shorthand method names are similar: 

```
// ES5
var user {
    getUserName: function(user) {
        return user.firstname + ' ' + user.lastname;
    }
}

// ES6
var user {
    getUserName(user) {
        return user.firstname + ' ' + user.lastname;
    }
}
```

In ES6, it's allowed to use variable property names

```
const key = "firstname";

const user = {
    [key]: "STM",
}
```

## Unidirectional Data Flow

When an action gets triggered in the view, for example with `onClick` event, the Component updates the state, which then re-renders the view. [Additional reading](https://reactjs.org/docs/state-and-lifecycle.html).

## Bindings 

```
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
        };

        // the next line binds "this" to the local method
        this.onDismiss = this.onDismiss.bind(this);
    }
}
```

The binding of `this` is necessary, because class methods don't automatically bind `this` to the class instance. However, using the arrow notation, methods can auto-bind this.

```
class ExplainBindingsComponent extends Component {
    onClickMe = () => {
        console.log(this);
    };

    render() {
        return (
            <button
                onClick={this.onClickMe}
                type="button"
            >Click me
            </button>
        );
    }
}
```

## Event Handler

When inserting event handling functions, it's important to remember that the code withing curly braces will get evaluated. So it's necessary to use HOF in that case. It's an often source of mistakes.

This will get executed immediately:

```
<button
    onClick={console.log(this)}
    type="button"
>
```

As opposed to this:

```
<button
    onClick={() => console.log(this)}
    type="button"
>
```


## Interactions with Forms and Events

Event handling functions receive an `event` object. It's `target` property contains `value` of element which triggered the event.


## Controlled Components

The "uncontrolled components" are, for example, form elements like `input`, `select`, `textarea`, when we don't explicitly declare their value. When the value is stated, they become "controlled components".

More about [different controlled components](https://github.com/the-road-to-learn-react/react-controlled-components-examples).


## Component Declarations

A good rule of thumb in deciding whether to use functional stateless components or class components is to go with the functional stateless, if there's no need for local state or lifecycle methods. Usually the components are created as functional stateless components until there's need for state or lifecycle methods, then they get refactored to ES6 class components.

### Functional Stateless Components
Declared as functions, they take `props` as parameter and return JSX. They don't have internal state, so no calls `this.setState()` or access to `this.state`. Additionally, they have no lifecycle methods.

### ES5 Class Components
Extend from `React.Component` which gives them internal state, plus all the lifecycle methods. 

### React.createClass
Even though it's still used in ES5 React applications, it's been deprecated.