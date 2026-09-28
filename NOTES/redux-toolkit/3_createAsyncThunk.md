> # createAsyncThunk

- It’s a helper from Redux Toolkit that simplifies handling async logic (API calls, delays, etc.) in Redux.

- Instead of writing multiple action types manually (REQUEST, SUCCESS, FAILURE), it generates them automatically.

> ## SYNTAX

`createAsyncThunk` is a function that accepts a Redux action type string and a callback function that should return a promise.

```js
createAsyncThunk("user/registerUser", async () =>{
  // API or async logic
})

/* createAsyncThunk returns a standard Redux thunk action creator. The thunk action creator function will have plain action creators for the pending, fulfilled, and rejected cases attached as nested fields. */
```

### PARAMETERS

`createAsyncThunk` accepts three arguments:

- **A string action type:** Usually in 'domain/actionName' format like 'account/register', 'account/login' etc. Used to generate the pending/fulfilled/rejected action constants.

- **A payload creator:** A function that returns a Promise (usually your `fetch` or `axios` call).

- **options object**


> ## EXAMPLE

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Define the async thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    // returns promise 
    return await response.json(); // This becomes the 'fulfilled' payload
  },
);
/* 
fetchUserById returns promise(pending, fulfilled and rejected) 

Here, users/fetchById due to below we have sice name is user. So user is domain and fetchById is ActionName */
```

---

> ## 2. Handling the "Lifecycle" in the Slice

Unlike regular actions, async thunks are handled in the `extraReducers` section of your slice. This is because the thunk automatically generates three actions for you:

- `pending`: The request has started.
- `fulfilled`: The request finished successfully.
- `rejected`: The request failed.

```javascript
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {}, // Standard synchronous actions go here

  /*
  Async code goes here...
  using the "builder callback" notation */
  extraReducers: (builder) => {
    /* This function has access to builder where we can add addCase method. This method will have access to promise return by createAsyncThunk and callback function which has access to state and action. */
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Data from our API call
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch user";
      });
  },
});

export default userSlice.reducer;
```

---

> ## 3. Using it in a Component

To trigger the API call, you just `dispatch` the thunk like a normal action.

```javascript
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "./userSlice";

function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data && <h1>{data.name}</h1>}</div>;
}
```
