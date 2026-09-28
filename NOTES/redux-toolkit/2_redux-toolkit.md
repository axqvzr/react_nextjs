> # MODERN REDUX TOOLKIT

> ## Redux toolkit

- The modern and preferred way of writing Redux code.

- An opinionated approach, forcing us to use Redux best practices.

- 100% compatible with “classic” Redux, allowing us to use them together.

- Allows us to write a lot less code to achieve the same result (less “boilerplate”)

- Gives us 3 big things (but there are many more...):
  - We can write code that “mutates” state inside reducers (will be converted to immutable logic behind the scenes by “Immer” library).

  - Action creators are automatically created.

  - Automatic setup of thunk middleware and DevTools.

> ## Installation

```bash
npm i @reduxjs/toolkit react-redux

# @reduxjs/toolkit – core utilities (createSlice, configureStore, etc.)

# react-redux – bindings that let React components read(useSelector) from and dispatch to the store.
```

> ## Example : Explanation

### 1. Files and Folder structure

```
src/
 ├── app/
 │    └── store.js
 ├── features/
 │    └── counter/
 │         ├── counterSlice.js
 │         └── Counter.jsx
 ├── App.jsx
 └── main.jsx (or index.js)
```

---

### `features/counter/counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

/* STEP 1: Create a Slice
A slice contains the state and all the ways to update it */

/* Initial state */
const initialState = {
  value: 0,
  history: [],
};

const counterSlice = createSlice({
  name: "counter" /* slice name */,
  initialState /* Shorthand : initialState: initialState */,
  reducers: {
    /* These are "action creators" - they create actions AND define how state updates */

    /* remember account/deposit so in this also increment is like second part(actionName). It has access to currentState and action */
    increment: (state) => {
      state.value += 1; /* now we can write mutating action directly(as under the hood, it uses immer library which lets us mutate). Now need to return entire state */
      state.history.push(`Incremented to ${state.value}`);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Decremented to ${state.value}`);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(`Added ${action.payload}, now ${state.value}`);
    },
    reset: (state) => {
      state.value = 0;
      state.history = ["Reset to 0"];
    },
    /* We can directly write function instead of doing like above. like reset(state){...}, shorthand modern way */
  },
});

/* Export the action creators (these are automatically generated! */
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

/* export reducer */
export default counterSlice.reducer;
```

---

### `app/store.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

/* 
STEP 2: Create the Store

The store holds all our app's state. Using configure we don't need to manually set for Devtools, thunk(middleware), combineReducer() etc. They are added automatically.
*/
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    /* reducerNewName(key) : reducer(value) */
  },
});

/*  configureStore accepts { object }. We add all reducers here.  */
```

---

### `features/counter/Counter.jsx`

```jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";

/* STEP 3: Create Components that use Redux */
export default function Counter() {
  /* useSelector lets us read data from the store */
  const count = useSelector((state) => state.counter.value);
  const history = useSelector((state) => state.counter.history);

  /* useDispatch lets us send actions to update the store */
  const dispatch = useDispatch(); // returns function

  return (
    <div>
      <h2>Redux Toolkit Counter</h2>

      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>

      <h3>History</h3>
      {history.map((h, i) => (
        <p key={i}>{h}</p>
      ))}
    </div>
  );
}
```

---

### `App.jsx`

```jsx
import React from "react";
import Counter from "./features/counter/Counter";

export default function App() {
  return <Counter />;
}
```

---

### `main.jsx` (or `index.js`)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

/* STEP 4: Wrap your app with the Provider
This gives all components access to the store */
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

---


> ## Multiple arguments

### PRO : Slice with prepare for multiple args
```js
addSmart: {
  reducer: (state, action) => {
    const { amount, message } = action.payload;
    state.value += amount;
    state.history.push(message);
  },

  prepare: (amount, message) => {
    return {
      payload: {
        amount,
        message,
        time: Date.now()
      }
    };
  }
}
```


```js
/* Dispatch (multiple args!) */
dispatch(addSmart(5, 'Added via prepare'));
```
---

### Pass Multiple Values via Payload Object

```js
updateUser: (state, action) => {
  const { name, age } = action.payload; // Destructuring

  state.name = name;
  state.age = age;
}
```

```js
// Passing multiple args
dispatch(updateUser({ name: 'AR', age: 22 }));
```

### 


> ## Redux Toolkit vs old redux

| Feature      | Classic Redux | Redux Toolkit    |
| ------------ | ------------- | ---------------- |
| Actions      | Manual        | Auto-generated   |
| Reducers     | switch-case   | object syntax    |
| Immutability | manual spread | auto (Immer)     |
| Boilerplate  | HUGE          | Minimal          |
| Store setup  | complex       | `configureStore` |
| DevTools     | manual        | built-in         |

---

> ## END

