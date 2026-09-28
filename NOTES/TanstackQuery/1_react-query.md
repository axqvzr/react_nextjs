> # TANSTACK QUERY


---
Teach me tanstack query : what is react-query, when to use, cons, pros, installation, syntax, real life example for querying/fetching and mutating explaing what is used and why is used, folder structure, mistakes to avoid, tips & tricks, devtool setup, 

---

queryKey &rarr; identifies data uniquely
fun - type of funtion that return promise
staletime - defines that data won't be fetched upto certain time. when that time exceeds then it will refetch again. OR simply how long does it takes to data stale.

> # STOP STARTS HERE........

Alright—this is one of those tools that feels “meh” at first and then quietly becomes the backbone of your entire frontend 😄
Let’s break **TanStack Query (React Query)** down in a way that actually sticks and is usable in real projects.

---

# 🚀 What is TanStack Query (React Query)?

**TanStack Query** (formerly React Query) is a **server-state management library**.

👉 Key idea:

* React state (`useState`) = local UI state
* TanStack Query = **remote/server state**

It handles:

* Fetching data
* Caching it
* Syncing it
* Updating it automatically

Without you writing tons of boilerplate.

---

# 🧠 Why it exists (Problem it solves)

Before React Query, you probably did this:

```js
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(setUsers)
}, [])
```

Problems:

* No caching ❌
* No refetching ❌
* Loading & error logic repeated ❌
* Hard to scale ❌

👉 TanStack Query solves all of this.

---

# ✅ When to use it

Use it when:

* You’re fetching API data (REST/GraphQL)
* You need caching
* You want auto refetching
* You have mutations (POST, PUT, DELETE)
* Your app grows beyond basic state

Avoid it when:

* Static data only
* Tiny apps with no API complexity

---

# ⚖️ Pros & Cons

## ✅ Pros

* Automatic caching
* Background refetching
* Devtools (huge win)
* Handles loading/error states cleanly
* Optimistic updates (fast UX)
* Pagination/infinite scroll support

## ❌ Cons

* Learning curve
* Overkill for small apps
* Requires understanding async flow
* Can get messy if query keys are poorly structured

---

# 📦 Installation

```bash
npm install @tanstack/react-query
```

---

# ⚙️ Setup (VERY IMPORTANT)

Wrap your app:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}
```

---

# 🔍 Basic Query (Fetching)

```jsx
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users')
  return data
}

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return data.map(user => <div key={user.id}>{user.name}</div>)
}
```

---

## 🧠 What’s happening here?

* `queryKey`: unique identifier (used for caching)
* `queryFn`: API call
* `data`: cached result
* `isLoading`: loading state
* `error`: error state

---

# ✏️ Mutation (POST / UPDATE / DELETE)

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const addUser = (newUser) => {
  return axios.post('/api/users', newUser)
}

function AddUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  return (
    <button
      onClick={() => mutation.mutate({ name: 'John' })}
    >
      Add User
    </button>
  )
}
```

---

## 🧠 Why `invalidateQueries`?

👉 It tells React Query:

> “Hey, refetch users because data is outdated”

---

# 🌍 Real-Life Example (Clean Structure)

Let’s simulate a production-like setup.

## 📁 Folder Structure

```
src/
 ├── api/
 │   └── userApi.js
 ├── hooks/
 │   └── useUsers.js
 ├── components/
 │   └── Users.jsx
 ├── mutations/
 │   └── useAddUser.js
 └── App.jsx
```

---

## 📡 API Layer

```js
// api/userApi.js
import axios from 'axios'

export const getUsers = () => axios.get('/api/users').then(res => res.data)
export const createUser = (data) => axios.post('/api/users', data)
```

---

## 🪝 Custom Hook (Query)

```js
// hooks/useUsers.js
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/userApi'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
}
```

---

## ✏️ Mutation Hook

```js
// mutations/useAddUser.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api/userApi'

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
}
```

---

## 🧩 Component

```jsx
import { useUsers } from '../hooks/useUsers'
import { useAddUser } from '../mutations/useAddUser'

function Users() {
  const { data, isLoading } = useUsers()
  const addUser = useAddUser()

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <button onClick={() => addUser.mutate({ name: 'AR' })}>
        Add User
      </button>

      {data.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  )
}
```

---

# 🧪 DevTools Setup (HIGHLY RECOMMENDED)

```bash
npm install @tanstack/react-query-devtools
```

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

👉 This lets you:

* See cache
* Refetch manually
* Debug instantly

---

# ⚠️ Common Mistakes

❌ Using same query key for different data
👉 Always structure keys:

```js
['users', userId]
```

---

❌ Fetching inside components repeatedly
👉 Use custom hooks instead

---

❌ Not invalidating after mutation
👉 Leads to stale UI

---

❌ Overusing global state (Redux) for server data
👉 Let React Query handle it

---

# 💡 Tips & Tricks

### 🔁 Auto Refetch

```js
refetchOnWindowFocus: true
```

---

### ⏳ Stale Time (IMPORTANT)

```js
staleTime: 1000 * 60 * 5 // 5 minutes
```

👉 Prevents unnecessary refetches

---

### 🚀 Optimistic Updates

```js
onMutate: async (newUser) => {
  await queryClient.cancelQueries(['users'])

  const previous = queryClient.getQueryData(['users'])

  queryClient.setQueryData(['users'], old => [...old, newUser])

  return { previous }
}
```

👉 UI updates instantly before server responds

---

### 📄 Pagination

```js
useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers(page)
})
```

---

# 🧩 Mental Model (VERY IMPORTANT)

Think of TanStack Query as:

> 🧠 “A smart cache layer between your UI and your API”

It:

* Stores data
* Syncs it
* Keeps it fresh
* Avoids duplicate requests

---

# 🧭 When NOT to use it

* Pure UI state (useState / Zustand)
* Forms (use React Hook Form)
* Static config data

---

# 🔥 Final Insight

If you're building:

* dashboards
* SaaS apps
* admin panels
* real-time-ish apps

👉 TanStack Query becomes **non-negotiable**

---

If you want, I can next:

* walk you through **infinite scroll**
* show **auth + react-query integration**
* or build a **full MERN + React Query mini app**
