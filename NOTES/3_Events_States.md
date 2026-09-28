> # TABLE OF CONTENTS

- EVENTS
- STATE

> ## EVENTS

- Events in react are handled directly inside element using inline method.

  ```jsx
  funtion App() {
      return (
          <butto onClick={()=>alert("Hello React learner!")} >Click me</butto>
      )
  }
  {/* Do not call function directly like
  alert("Hello")
  as it will run as soon as App components will mount/render. So to avoid this call function inside callback function like so
  ()=>alert("hello") */}

  ```

- We usually define event handler function in component before return keyword and we just pass.
  ```jsx
   funtion App() {
      // Define here
      const handleClick = ()=> alert("Hello");
      // Standard covention to use "handle" keyword and very common. If we store this in variable or pass as props we can use "on" keyword infront of it like onHandleClick
      return (
          /* Just pass. Do not call like handleClick() but if you want you can using callBackFn like ()=> handleClick() */
          <butto onClick={handleClick} >Click me</butto>
      )
  }
  ```

> ## STATE

- State is react component memory.

- `Updating the components state triggers React to re-render the components`

- State allows local variables persist across renders.

- EXAMPLE

  ```jsx
  import { useState } from "react";

  funtion App() {
    const hey = useState(1);
    console.log(hey);
    /* when we console, we will see the 2 values. 1st value is the initial value we want to have in our state and 2nd value the the funtion so update the value. let's destructure it */
    const [something,setSomething] = useState(1);
    /* something is state name and have initial value of 1 and setSomething is the funtion to update the something.

    Initial values can be string, number, Boolean, object, callbackFn(lazy evaluation) etc

    For updater function we usually add set infront of stateName using camelCase. This is common naming convention and standard but we can use anything.
     */

    // UPDATE STATE, always update state using updater/setter function. Don't update manually
    funciton handleIncrease(){
        setSomething(something + 1)
    }

    return (
      <button onClick={handleIncrease}>{something}</button>
    )
  }
  ```

- We should `always update state based on current state.` If state is depends upon current state. Otherwise it's fine updating directly. Example

  ```jsx
  import { useSate } from "react";

  function App() {
    const [count,setCount]=useState(0);

    function handleIncrease(){
      // Use callbackFn to update state if we want state to be updated based on current state
      setCount(count => count+1)
      /* Call updater function that has callBackFn which receives current value and then we update value.  */
    }

    return (
      <p>{count}</p>
      <button onClick={handleIncrease}>Add</button>
    )
  }
  ```

- `useState is react hook. We can identify hook easily as hook starts with use keyword`

- We can only call hook on the top level of components not inside if statement, loop or another function etc.

- ![Mechanics of State in React](../Assets/Mechanics%20of%20state%20in%20react.png)

- `Each components has and manages its own state, no matter how many times we render the same components. They operate independently. Basically state is isolated inside of its components.` _Example : Suppose we have component that increase count value. If we call that components in multiple times in multiple place then clicking on increase button only changes to that component and other will remain unaffected_

### When to use state

- If there anything that changes in the screen/view then we need state (Visual changes). Example
  - Clicking on element show something and clicking again hides it. We can achieve this by combining state, event and &&.

- Use a state variable for any data that the component should keep track of ("remember") over time. This is the data that will change at some point. In vanilla JS, that's a let variable, or an [] or {}

- Whenever you want somthing in the component to be dynamic, create a piece of state relates to that "thing", and update the state when the "thing" should change("aka dynamic").
  - Example: A modal window can be open or closed. So we create a state variable
    isOpen that tracks whether the modal is open or not. On isOpen = true we
    display the window, on isOpen = false we hide it

- If you want to change the way a component looks, or the data it displays, update its state. This usually happens in an event handler function.

- For data that should not trigger component re-renders, don’t use state. Use a regular variable instead. This is a common beginner mistake.

> ### callBackFn as an initial value in STATE

- State also take `callBackFunction` as an inital value in useState which is also called lazy evaluation.
- Function must be `pure` and accept `no arguments`. Called only on initail render.

```jsx
const [count, setCount] = useState(() => localStorage.getItem("count"));
```

### Extension

- React Developer Tools, Download browser extension

> ## End
