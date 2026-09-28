> # REDUX DEVTOOLS For Modern Redux Toolkit

- If you're using **Redux Toolkit**, it’s already built in. Make sure to install browser extension of it.

- Just configure store like this:

    ```js
    import { configureStore } from "@reduxjs/toolkit";
    import rootReducer from "./reducers";

    const store = configureStore({
    reducer: rootReducer,
    devTools: true, // optional (enabled by default)
    });

    export default store;
    ```

- That’s it. No extra package needed.


- Optional (Production Safety) : Disable DevTools in production.

    ```js id="kq2gpc"
    const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    });
    ```


> ## END