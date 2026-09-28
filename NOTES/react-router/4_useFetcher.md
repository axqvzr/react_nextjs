> # useFetcher ()


## 🧠 What is `useFetcher`?

`useFetcher` is a hook from React Router that lets you:

* Submit forms **without navigation**
* Call loaders/actions **in the background**
* Manage request state (`idle`, `loading`, `submitting`)

👉 Think of it as:

> “Do data mutations or fetch data *without changing the route*.”

---

## 📦 When should you use it?

Use `useFetcher` when you want:

### ✅ Background interactions

* Like button 👍
* Bookmark toggle 🔖
* Delete item 🗑️

### ✅ Partial UI updates

* Updating a list item
* Inline editing

### ❌ NOT for full-page navigation

Use `<Form>` or `useNavigate` instead for that.

---

## 🏗️ Basic Router Setup (createBrowserRouter)

```jsx
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Root from "./Root";
import Posts, { loader as postsLoader, action as postsAction } from "./Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
        action: postsAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## ⚙️ Example: Using `useFetcher` for a Like Button

### 1. Action (server interaction)

```jsx
export async function action({ request }) {
    // action also has access to params
  const formData = await request.formData();
  const postId = formData.get("postId");

  // simulate DB update
  console.log("Liked post:", postId);

  return { success: true };
}
```

---

### 2. Component with `useFetcher`

```jsx
import { useFetcher } from "react-router-dom";

export default function Posts() {
  const fetcher = useFetcher();

  return (
    <div>
      <h2>Posts</h2>

      <fetcher.Form method="post">
        <input type="hidden" name="postId" value="123" />
        <button type="submit">
          {fetcher.state === "submitting"
            ? "Liking..."
            : "Like ❤️"}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

---

## 🔍 What’s happening here?

### `fetcher.Form`

* Works like `<Form>`
* But **does NOT navigate**

---

### `fetcher.state`

| State        | Meaning            |
| ------------ | ------------------ |
| `idle`       | nothing happening  |
| `submitting` | form submitted     |
| `loading`    | waiting for loader |

---

### `fetcher.data`

* Contains response from `action` or `loader`

```jsx
{fetcher.data?.success && <p>Liked!</p>}
```

---

## 🔄 Example: Fetch data without navigation

```jsx
const fetcher = useFetcher();

useEffect(() => {
  fetcher.load("/posts");
}, []);
```

👉 This calls the loader of `/posts` without changing the URL.

---

## 🧩 Example: Delete Item (No Page Refresh)

```jsx
<fetcher.Form method="post">
  <input type="hidden" name="postId" value={post.id} />
  <button name="_action" value="delete">
    Delete
  </button>
</fetcher.Form>
```

### Action:

```jsx
export async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "delete") {
    const id = formData.get("postId");
    // delete from DB
  }

  return null;
}
```

---

## 🧠 When vs Where vs How (Quick Mental Model)

### 🟢 When

* You need **background mutation**
* You want **no navigation**
* You want **fine-grained UI updates**

---

### 📍 Where

* Inside components (cards, buttons, list items)
* Not in router config

---

### ⚙️ How

1. Call `useFetcher()`
2. Use:

   * `fetcher.Form`
   * OR `fetcher.submit()`
   * OR `fetcher.load()`
3. Read:

   * `fetcher.state`
   * `fetcher.data`

---

## ⚡ Bonus: Programmatic Submit

```jsx
fetcher.submit(
  { postId: "123" },
  { method: "post", action: "/posts" }
);
```

---

## 🚀 Pro Tip (MERN + AI apps)

`useFetcher` is perfect for:

* Chat message send (without rerouting)
* Live AI responses streaming trigger
* Inline CRUD dashboards

---
