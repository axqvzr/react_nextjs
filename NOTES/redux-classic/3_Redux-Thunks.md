> # REDUX THUNK

> ## WHY THUNK (Redux middleware)

- In redux, we cannot do asynchronous operations. Reducers need to be pure functions. In such case middleware is used.

- `Middleware` : A function that sits between dispatching the action and the store. Allows us to run code after dispatching, but before reaching the reducer in the store.
  - Perfect for asynchronous code.
  - API calls, timers, logging, etc.
  - The place for side effects.

> ## Installation

```bash
npm i redux redux-thunk
```

> ## EXAMPLE

### 1. Congfigure Store

```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Pass thunk in applyMiddleware() inside createStore()
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

### 2. Actions (Sync + Async)

```js
// actionTypes.js
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
```

```js
// userActions.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actionTypes";

// Thunk action
export const fetchUsers = () => {
  /*
   Normal redux action creator returns a plain object BUT Redux Thunk action creator Returns a function
   
   This return function has access to dispatch function and getState : (dispatch, getState) => { ... }
   */
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    /* Keep API logic inside thunks, not components */
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();

      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message,
      });
    }
  };
};
```

### 3. Reducer

```js
// userReducer.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
```

### 4. Use in React Component

```js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./actions/userActions";

const Users = () => {
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // dispatching function
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Users;
```

> ## Withour thunk (Not Recommended : BAD PRACTICE)

```js
// Component handles everything (bad practice)
useEffect(() => {
  dispatch({ type: "FETCH_USERS_REQUEST" });

  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: err });
    });
}, []);
```

> ## END