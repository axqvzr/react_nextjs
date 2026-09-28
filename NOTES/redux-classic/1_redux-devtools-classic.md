> # REDUX DEVTOOLS

> ## Setup for classic redux

- Install Redux DevTools Extension (Browser)

- Install helper package

  ```bash
  npm install redux-devtools-extension
  ```

- Configure store

  ```js
  import { createStore, applyMiddleware } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import rootReducer from "./reducers";

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  export default store;
  ```

- Optional (Production Safety) : Disable DevTools in production

  ```js
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
  ```

> ## END
