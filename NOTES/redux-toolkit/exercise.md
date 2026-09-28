> # SEE FAST REACT PIZZA PROJECT

> REDUX IS SYNCHRON0US BY NATURE, ASYNC ARE PERFORMED USING THUNK

> Calculating total / making reading state easier

```jsx
// we can calculate total item, total price in slice file
// userSlice.js

const initialState = [
  {
    name: "",
  },
];

const userSlice = createSlice({
  // reducers logic
});

// to calcualte total no of users
export const getTotalUsers = (state) =>
  state.user.reduce((total, user) => total + user.user, 0);
// convention to use get for selectors

/* Then use : const total = useSelector(getTotalUsers) 
but leads to performance issues in larger apps so for that we can use reselect library 
*/
```

```jsx
// can can call any reducers within reducers using caseReducers method

// calling deleteUser action within another action
someREducer.caseReducers.deleteUser(state, action);
```

> ## TRICK : How to use useDispatch() hook outside of component

```js
// using hook in function
import store from "../../store"; // import main store

function() {
// use like this
store.dispatch(addUser()) // dispatching function
}
// REMINDER : Do not overuse
```

> ## END
