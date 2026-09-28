> # Data Loading in createBrowserRouter

- `fetch as you render means it will fetch data from at the same time components gets render`

- `Before using useEffect : first compoents used to render first then useEffect(runs after browser paints) runs and fetch data.`

> What we covers in this

- useLoaderData()
- useNavigation()
- useRouterError
- loader params

> ## EXAMPLE

### Router Setup (createBrowserRouter)

```js
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Posts, { loader as postsLoader } from "./pages/Posts";
import PostDetails, { loader as postDetailsLoader } from "./pages/PostDetails";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // parent level error
    children: [
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
        // loader:()=>{ fetchlogic }
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
        loader: postDetailsLoader,
        errorElement: <ErrorPage />, // route-specific error
      },
    ],
  },
]);
```

---

### `useLoaderData()` — WHY & WHEN

- You fetch data **before rendering**
- You want **SSR-friendly / predictable data loading**

```js
// pages/Posts.js : Creating function that fetched post data
export async function loader() {
  const res = await fetch("https://api.example.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
/* convention to name this function(which fetches) loader(). We can have multiple function with same name but when importing we can rename it. Example if it fetches post then we can rename as postLoader */
```

```js
// Using it
import { useLoaderData } from "react-router-dom";

function Posts() {
  const posts = useLoaderData();
  /* So how its actually getting right data, Post component and postLoder(loader) are tied in specific route or both are attached to same route. React router knows 'this component belongs to the posts route so give it that loader's data' */

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

**Why use it instead of useEffect?**

- Runs **before render**
- Avoids loading flicker
- Built-in error handling

---

### `useNavigation()` — loading state (super useful)

- Navigating between routes
- Submitting forms

```js
import { useNavigation } from "react-router-dom";

function RootLayout() {
  const navigation =
    useNavigation(); /* let's you check state of data fetching like idle, loading, submitting etc */

  // console.log(navigation)

  return (
    <>
      {navigation.state === "loading" && <p>Loading...</p>}
      <Outlet />
    </>
  );
}
```

💡 States:

- `"idle"`
- `"loading"`
- `"submitting"`

✅ Real-life use:

- global loader spinner
- disable buttons during navigation

---

### `useRouteError()` + `errorElement`

```js
// CREATING ERROR PAGE
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError(); // To catch any error

  return (
    <>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </>
  );
}
```

**USING**

```js
{
  path: "/",
  element: <RootLayout />,
  errorElement: <ErrorPage />, // Placing in parent level
}
/* Catches: ALL child route errors, layout errors, loader errors inside children */
```

```js
{
  path: "posts/:postId",
  element: <PostDetails />,
  loader: postDetailsLoader,
  errorElement: <ErrorPage />, // placing in specific rotue/child
}
/* Catches ONLY: this route’s loader errors and route’s render errors */
```

- Parent → one global generic fallback
- Child → specific messages (e.g. "Post not found")

---

### Dynamic Routes + Params

```js
{
  path: "posts/:postId",
  element: <PostDetails />,
  loader: postDetailsLoader,
}
```

**Loader using params**

```js
export async function loader({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.postId}`);

  if (!res.ok) throw new Error("Post not found");

  return res.json();
}
/* cannot use useParams() since it is hook and hook can be used in component only. So fot that, this function has access to params
postId because we have route param as postId (post/:postId)
*/
```


### Putting it all together

**Flow**:

1. User clicks `/posts/123`
2. Router runs `loader({ params })`
3. Data fetched BEFORE render
4. UI renders with `useLoaderData()`
5. If error → `errorElement` shown
6. During navigation → `useNavigation()` shows loader

---

**Key Takeaways**

- `useLoaderData()` → clean, preloaded data
- `useNavigation()` → global loading UX
- `useRouteError()` → structured error handling
- `errorElement`:
  - parent = global safety net
  - child = precise control

- dynamic routes:
  - use `params` in loaders
  - `useParams()` is optional, not required

## END