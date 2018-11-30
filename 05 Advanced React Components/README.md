# 05 Advanced React Components

  * Higher Order Components [HOC]
  * other advanced topics

## Ref a DOM element

Even though referencing DOM nodes directly is usually considered an anti-pattern, there are some situations where it's necessary:

  * to use the DOM API (focus, media playback etc.) 
  * to invoke imperative DOM node animations 
  * to integrate with a third-party library that needs the DOM node (e.g. D3. js)

Asigning example:

```
    <input type="text" value={value} onChange={onChange} ref={el => this.input = el}/>
```

### Additional reading

  * Using [ref in React](https://www.robinwieruch.de/react-ref-attribute-dom-node/)
  * General [info about ref in React](https://reactjs.org/docs/refs-and-the-dom.html)


## Higher Order Components

As an equivalent to Higher Order Functions, it usually takes a Component, sometimes with additional arguments, and returns an enhanced Component. Useful convention is to prefix Components with "with"

Example: 

```
function withFoo(Component) {
  return function(props) {
    return <Component { ...props } />;
  }
}
```

Also, read the [gentle introduction to HOCs](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)


## Advanced sorting

For this sorting, `lodash` will be used, so it needs to be installed:

```
npm install lodash
```