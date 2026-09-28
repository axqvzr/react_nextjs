> # createBrowserRouter

New way of fetching data right inside React Router(v6.4+). It allows `render-as-you-fetch` instead of `Fetch-on-render`.

- This is the newer approach introduced in React Router v6.4+:
- built-in support for data loading(loader)
- Built-in mutations (action)
- route-level error handling
- Better for scalable apps

> ### When to choose what

Use BrowserRouter if:

- You’re building something small
- You don’t need advanced data handling

Use createBrowserRouter if:

- You’re building a production-level app
- You want cleaner data flow (like Remix-style apps)
- You care about structure and scalability

> ### Simple decision guide(React Router vs Tanstack Query vs RTK Query)
- Small app → use React Router only
- Medium app → add TanStack Query
- Redux app → use RTK Query

> ### Key Concepts

- `createBrowserRouter()` → defines route tree
- `children` → enables nesting
- `Outlet` → renders child routes
- `index: true` → default route
- `:param` → dynamic route
- Nested layouts = super powerful for dashboards

> ### Basic Setup

```bash
npm install react-router-dom
```

> ### Example Structure

```
src/
 ├── main.jsx
 ├── App.jsx
 ├── pages/
 │    ├── Home.jsx
 │    ├── About.jsx
 │    ├── Users.jsx
 │    ├── UserDetails.jsx
 │    ├── Dashboard.jsx
 │    └── Settings.jsx
```

> ### 🚀 Router Configuration

### `main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      // ✅ Normal routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },

      // ✅ Nested routes
      {
        path: "users",
        element: <Users />,
        children: [
          // ✅ Dynamic route
          {
            path: ":userId",
            element: <UserDetails />,
          },
        ],
      },

      // ✅ Nested layout example
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
```

---

## 🧱 Layout Component

### `App.jsx`

```jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/users">Users</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>

      <hr />

      {/* 🔥 Renders child routes */}
      <Outlet />
    </div>
  );
}
```

---

## 📄 Example Pages

### `Users.jsx` (Nested Parent)

```jsx
import { Link, Outlet } from "react-router-dom";

export default function Users() {
  return (
    <div>
      <h2>Users Page</h2>

      <ul>
        <li>
          <Link to="1">User 1</Link>
        </li>
        <li>
          <Link to="2">User 2</Link>
        </li>
      </ul>

      {/* 🔥 Nested route renders here */}
      <Outlet />
    </div>
  );
}
```

---

### `UserDetails.jsx` (Dynamic Route)

```jsx
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { userId } = useParams();

  return <h3>User ID: {userId}</h3>;
}
```

---

### `Dashboard.jsx` (Nested Layout)

```jsx
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <Link to="settings">Settings</Link>

      <Outlet />
    </div>
  );
}
```

---

> ## CREATING LAYOUT

```jsx
// AppLayout.jsx
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

```jsx
// App.jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />, // SKIP path & Add children then it will be root layout, which we can use to create Layout for our application
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/new",
        element: <NewPost />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

> ## END
