> # CUSTOM HOOKS, REFS & More STATE

## TABLE OF CONTENTS

- Rules for Hooks
- Refs
- Custom hooks
- Tips and tricks

> ## RULES FOR HOOKS

- `Only call hooks at the top level`
  - Do NOT call hooks inside conditionals, loops, nested functions, or after an early return
  - This is necessary to ensure that hooks are always called in the same order (hooks rely on this)

- `Only call hooks from React functions`
  - Only call hooks inside a function component or a custom hook

> ## REFS

- `useRef` is a React Hook that creates a persistent, mutable object { current: ... } which survives component re-renders without triggering them.

- It is primary used for directly accessing DOM elements (e.g., focus, scroll) or storing instance variables (e.g., timer IDs). Unlike state.

- Changing a ref does not cause a rerender.

- `Refs are fot data that is NOT rendered`: usually only appear in event handlers or effects, not in JSX(otherwise use state).

- Do NOT read, write or read .current in render logic (like state)

> ### EXAMPLE

```jsx
import { useRef } from "react";

function TextInputWithFocusButton() {
  /* useRef(initalValue), for DOM we basically use null */
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // Access the DOM node directly via .current
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

> ### useRef vs useState

- Updating state causes a re-render; updating useRef does not.
- state are immutable while refs are mutable.
- State updates are asynchronous whereas Refs updates synchronously.

> ## CUSTOM HOOKs

**A custom hook is just a JavaScript function that:**

- `Starts with use`
- `Uses other React hooks or must have one of them` (useState, useEffect, etc.)
- Encapsulates `reusable logic`

**BASIC STRUCTURE**

```jsx
import { useState, useEffect } from "react";

function useSomething(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // side effect here
  }, []);

  return [value, setValue];
}
```

**EXAMPLE**

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

**_USAGE_**

```jsx
function Users() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**REMEMBER**

- Keep hooks focused (one responsibility)
- Return objects instead of arrays when multiple values
- Name clearly: useAuth, useDebounce, useLocalStorage

> ## Tips and Tricks

- Hooks rules are automatically enforeced by React's ESLint rules
- We can disable ESLint by commenting eslint disable in code
  - `/* eslint-disable */`

> ## END
