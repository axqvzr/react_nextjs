> # NEVER SET STATE DURING RENDER

Setting state during render (or in logic that runs *while React is rendering*) is one of those things that can seem harmless—but it breaks how React is designed to work. Let’s walk through some concrete examples and why they cause trouble.

---

## 🚫 Example 1: Direct state update in render

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Bad: updating state during render
  if (count < 5) {
    setCount(count + 1);
  }

  return <div>{count}</div>;
}
```

### ⚠️ What happens?

* React renders → `setCount` runs → triggers re-render
* Re-render → `setCount` runs again → loop continues

### 💥 Problem:

**Infinite render loop** (or React throws: “Too many re-renders”)

---

## 🚫 Example 2: Deriving state inside render

```jsx
function User({ name }) {
  const [displayName, setDisplayName] = useState("");

  // ❌ Bad: syncing props to state in render
  if (displayName !== name) {
    setDisplayName(name);
  }

  return <h1>{displayName}</h1>;
}
```

### 💥 Problems:

* Causes unnecessary re-renders
* Can still loop depending on conditions
* Breaks predictable data flow

### ✅ Better:

```jsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

Or if transformation is needed:

```jsx
const displayName = name.toUpperCase();
```

---

## 🚫 Example 3: State update based on derived condition

```jsx
function App({ items }) {
  const [hasItems, setHasItems] = useState(false);

  // ❌ Bad
  if (items.length > 0) {
    setHasItems(true);
  }

  return <div>{hasItems ? "Has items" : "Empty"}</div>;
}
```

### 💥 Problems:

* Re-renders every time `items` changes
* State is redundant (can be derived from props)

### ✅ Better:

```jsx
const hasItems = items.length > 0;
```

---

## 🤯 Why this is fundamentally wrong

React rendering must be **pure**.

### 🔑 Rule:

> Render should only calculate UI — no side effects.

When you call `setState` during render, you:

* Introduce **side effects inside a pure function**
* Break React’s **reconciliation process**
* Make behavior **unpredictable in concurrent rendering**

---

## ⚠️ Hidden issues (beyond infinite loops)

### 1. 🔁 Double rendering in Strict Mode

React (especially in development) may render components twice to detect bugs.

→ Your state updates may run twice unexpectedly

---

### 2. 🧠 Mental model breaks

React expects:

```
state/props → render → UI
```

But with state updates in render:

```
render → state update → render → state update → chaos
```

---

### 3. ⚡ Performance issues

Even if it *doesn’t* loop:

* You trigger unnecessary renders
* Waste CPU cycles
* Cause UI flickering

---

## ✅ When you *should* set state instead

### ✔️ Inside event handlers

```jsx
<button onClick={() => setCount(count + 1)}>Click</button>
```

### ✔️ Inside `useEffect`

```jsx
useEffect(() => {
  setCount(5);
}, []);
```

### ✔️ Inside callbacks / async logic

```jsx
fetchData().then(data => setData(data));
```

---

## 🧠 Quick rule of thumb

If you’re inside the main body of a component and thinking:

> “I’ll just call `setState` here…”

👉 Stop. That’s almost always a bug.

---

## 💡 Better patterns instead

* Derive values instead of storing them
* Use `useEffect` for syncing logic
* Keep render functions pure
* Minimize state (only store what you *can’t compute*)

---
