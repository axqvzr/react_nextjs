> # Mutations / actions

# 🧠 Why this exists (big picture)

`createBrowserRouter` (from React Router) introduced **data APIs** so your routes can:

* **Load data** → `loader`
* **Modify data** → `action`

Instead of:

```js
useEffect + fetch + state juggling
```

You get:

```js
form → action → server → auto revalidation
```

This makes React behave more like **server-driven frameworks** (cleaner, less boilerplate).

---

# ⚙️ Core Idea

Each route can define:

```js
{
  path: "/todos",
  loader: async () => {},
  action: async ({ request }) => {}
}
```

👉 `action()` handles:

* POST → create
* PUT → replace
* PATCH → update partial
* DELETE → remove

---

> # 🏗️ Real-Life Example: Todo App

## 1. Router Setup

```js
import { createBrowserRouter } from "react-router-dom";
import TodosPage from "./TodosPage";

export const router = createBrowserRouter([
  {
    path: "/todos",
    element: <TodosPage />,
    loader: todosLoader,
    action: todosAction,
  },
]);
```

---

## 2. Loader (GET data)

```js
export async function todosLoader() {
  const res = await fetch("/api/todos");
  return res.json();
}
```

👉 Runs automatically when route loads.

---

# 🔥 3. Action (handles ALL mutations)

This is where PUT, PATCH, DELETE, POST happen:

```js
export async function todosAction({ request }) {
    /* request is a Web Fetch API Request object
    
    It’s basically the same as the Fetch API Request, so you can:
    - Read form data
    - Check HTTP method (POST, PUT, DELETE)
    -Access headers, URL, etc.

    Use request.formData() → for simple forms
    Use request.json() → for API-style calls (more scalable)
    */
  const method = request.method;
  const formData = await request.formData();

  const todoId = formData.get("id");
  const text = formData.get("text");

  if (method === "POST") {
    return fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  }

  if (method === "PUT") {
    return fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }

  if (method === "PATCH") {
    return fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({ text }),
    });
  }

  if (method === "DELETE") {
    return fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
  }
}
```

---

# 🧾 4. UI (Forms trigger actions automatically)

## ➕ Create (POST)

```jsx
import { Form } from "react-router-dom";

<Form method="post">
  <input name="text" placeholder="New todo" />
  <button type="submit">Add</button>
</Form>
```

👉 Sends:

```
POST /todos
```

---

## ✏️ Update (PUT / PATCH)

```jsx
<Form method="put">
  <input type="hidden" name="id" value={todo.id} />
  <input name="text" defaultValue={todo.text} />
  <button>Update</button>
</Form>
```

OR partial update:

```jsx
<Form method="patch">
  <input type="hidden" name="id" value={todo.id} />
  <button>Mark Complete</button>
</Form>
```

---

## ❌ Delete

```jsx
<Form method="delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</Form>
```

---

# ⚡ How It Works Internally

1. `<Form>` intercepts submit (no page reload)
2. Sends request to matching route `action()`
3. `action()` runs based on HTTP method
4. After success:

   * React Router **re-runs loader automatically**
   * UI updates with fresh data

👉 No manual state syncing needed.


---

# 🤔 Why use this approach?

### ✅ 1. No useEffect chaos

No manual fetching after mutations.

### ✅ 2. Co-located logic

Route = UI + data + mutations

### ✅ 3. Cleaner mental model

Like backend routing:

```
GET /todos
POST /todos
PUT /todos/:id
DELETE /todos/:id
```

### ✅ 4. Automatic revalidation

Data always stays fresh.

---

# 🧠 When NOT to use it

* Highly interactive UI (drag/drop, realtime)
* Complex client-only state
* WebSockets-heavy apps

---

# ⚡ Bonus: Fetcher (no navigation)

If you don’t want navigation:

```js
import { useFetcher } from "react-router-dom";

const fetcher = useFetcher();

fetcher.submit(
  { id: todo.id },
  { method: "delete" }
);
```

---

# 🧩 Mental Model Summary

Think of it like:

```
Frontend Form → HTTP Method → Route Action → Backend → Loader Refresh
```

> ## END
