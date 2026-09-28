> # REACT ROUTER

> ## SPA vs SPA

- `Single Page Applications (SPAs)` (e.g., Gmail, Facebook) load once and update content dynamically for a fast, app-like experience, ideal for interactivity. `Multi-Page Applications (MPAs)` (traditional websites) reload the full page for each request, offering better SEO and faster initial load times for content-heavy sites.

> ## Routing

- `routing` is the mechanism that enables Single Page Applications (SPAs) to navigate between different views without a full browser reload. Since React is a UI library and does not have built-in routing, developers use third-party libraries like `React Router` to manage the application's URL and keep it in sync with the displayed components.

> ## React router

- For routing this is used in react.

**INSTALLATION**

- `npm i react-router-dom`
- To install specific version : `npm i react-router-dom@6`

> ## EXAMPLE 1 : Basic routing setup

```jsx
// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    // BrowserRouter wraps your entire app
    <BrowserRouter>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**_Using Link_**

- `Link` is used for basic navigation **_(no page reload)_**.
- Works like `<a>` but without reload
- No styling for active route
- Best for simple navigation

```jsx
// Navbar.jsx

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      {/* Simple navigation links */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;
```

**_Using NavLink_**

- `NavLink` is used when you want to style active links automatically.

```jsx
// Navbar.jsx

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      {/* NavLink provides isActive automatically */}

      <NavLink
        to="/"
        // className can be dynamic
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
```

**_Styling Active Links_**

```css
/* styles.css */

.active {
  color: red;
  font-weight: bold;
}
```

> ## EXAMPLE 2 : Nested and Dynamic

- `Route Params (Path Parameters)` : Parts of the URL path that act as variables.
  - Colon (:) is used to define route params. Example `<Route path="/users/:id" element={<User />} />`. Here after : is id so id is route param.

- `Dynamic Routes`
  - Routes that change based on parameters.
  - They are basically routes with variables in the path.
  - Example : `<Route path="/blog/:slug" element={<Post />} />`

```jsx
// App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

/* ------------------ Parent Layout ------------------ */
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Navigation inside dashboard */}
      <nav>
        {/* These are dynamic nested links */}
        <Link to="user/1">User 1</Link>
        <Link to="user/2">User 2</Link>
      </nav>

      {/* 👇 Nested routes will render here */}
      <Outlet />
    </div>
  );
}

/* ------------------ Dynamic Child ------------------ */
function User() {
  // Get dynamic param from URL
  const { id } = useParams();

  return (
    <div>
      {/* This changes based on URL */}
      <h2>User ID: {id}</h2>
    </div>
  );
}

/* ------------------ App ------------------ */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested + Dynamic route */}
          <Route path="user/:id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

> ## Query Strings (Search Params)

- Key-value pairs after ? in URL. Example `/products?category=shoes&sort=price`

- Use query strings when:
  - Data is optional
  - Filtering/sorting/searching
  - UI state (pagination, filters)
  - Bookmark

---

`?anyName=${data}&anotherVar=${data}`

- ? &rarr; to start query string
- `${}` &rarr; just JS, template literals for dynamic data
- & &rarr; to add more
- = &rarr; to store in variable

To access those variables we use useSearchParams that returns current state and function to update it similar to useState hook.

`const [searchParams, setSearchParams] = useSearchParams()`

like to access data from url

`const data = searchParams.get("variableName");`

To update, you can use like event handler like onclick

`setSearchParams({ variableName : data })`

> ## useNavigate

- `useNavigate` is a hook from React Router that lets you programmatically change routes in your React app (instead of using `<Link>`).

- **USE CASE**
  - Redirect after login/signup
  - Navigation on button click
  - Conditional redirects
  - Redirect after API success

- Use inside functions / events.

**SYNTAX**

```jsx
import { useNavigate } from "react-router-dom";

// useNavigate() returns function which we can use to navigate.
const navigate = useNavigate();

// Navigate to a path
navigate("/home");
```

- **_MOVE FORWARD/BACKWARD_**

```jsx
// whatever we pass becomes no of steps we want to move
navigate(-1); // will go one step back
navigate(1); // moves one step
navigate(-2); // two step back
```

> ### `<Navigate />` Component

- `<Navigate />` is a component version of navigation (instead of the useNavigate hook).

- Mainly used for
  - Redirecting inside JSX
  - Conditional routing (auth, guards, etc.)

- Use inside JSX / conditional UI.

**SYNTAX**

```jsx
import { Navigate } from "react-router-dom";

<Navigate to="/home" />;
```

**_USING REPLACE_**

```jsx
<Navigate to="/home" replace />
/* 
It replaces the current history entry.

User cannot go back to the previous page using the browser back button otherwise if not used user can go back using back button.
*/
```

**EXAMPLE**

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
// replace : Prevents user from going back to protected page after redirect
```

> ## END
