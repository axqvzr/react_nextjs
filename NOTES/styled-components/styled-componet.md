> # STYLED COMPONENTS

# 🚀 What is Styled Components?

**Styled-components** is a library that lets you write CSS _inside your JavaScript_, scoped to components.

Instead of:

- global CSS files ❌
- class name conflicts ❌

You get:

- component-level styles ✅
- dynamic styling with props ✅
- cleaner structure ✅

---

# 📦 1. Installation

Run this in your React project:

```bash
npm install styled-components
```

For TypeScript:

```bash
npm install --save-dev @types/styled-components
```

EXTENSION &rarr; VSCODE-STYLED-COMPONENTS

---

# 🧠 2. Basic Syntax

Here’s the core idea:

```jsx
import styled from "styled-components";
/* We can give any name but convention to give same name as HTML element starting with uppercase. */
const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
`;
```

Use it like a normal component:

```jsx
function App() {
  return <Button>Click Me</Button>;
}
```

👉 That’s it. You just created a styled React component.

---

# 🎯 3. Styling Different Elements

You can style **any HTML tag**:

```jsx
// adding hovering, & selects current selected element
const Title = styled.h1`
  font-size: 32px;

  &:hover {
    font-size: 44px;
  }
`;

const Container = styled.div`
  padding: 20px;
`;
```

---

# 🔥 4. Dynamic Styling (Props)

This is where it gets powerful.

```jsx
// template literal so we can add js directly using ${}
const Button = styled.button`
  background-color: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
`;
// variable : const any = css`text-align:center`
```

Usage:

```jsx
<Button primary>Primary</Button>
<Button>Default</Button>
```

Another

```jsx
import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "row" &&
    css`
      flex-direction: row;
    `}

  ${(props) =>
    props.type === "col" &&
    css`
      flex-direction: col;
    `}
`;

// we can add default props
Row.defaultProps = {
  type: "row",
};

export default Row;
```

```jsx
<Row type="row">Primary</Row>
<Row>Primary</Row>
```

👉 You can literally control CSS with React props.

---

# 🎨 5. Conditional Styling

```jsx
const Box = styled.div`
  padding: 20px;
  background: ${(props) => (props.dark ? "black" : "white")};
  color: ${(props) => (props.dark ? "white" : "black")};
`;
```

---

# 🧩 6. Extending Styles

Reuse styles like this:

```jsx
const Button = styled.button`
  padding: 10px;
`;

const DangerButton = styled(Button)`
  background: red;
  color: white;
`;
```

---

# 🧠 7. Styling Components

You can style _custom components too_:

```jsx
const Custom = ({ className }) => <div className={className}>Hello</div>;

const StyledCustom = styled(Custom)`
  color: green;
`;
```

```jsx
// Another way
const StyledApp = styled.div`
  background-color: red;
`;

function App() {
  return (
    <StyledApp>
      <h1>Hello</h1>
    </StyledApp>
  );
}
```

---

# 🌍 8. Global Styles

```jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
  }
`;
/* We can create global styles in separate file(need to export as well in order to use it )

We can also do for every styled components in searate file.
*/

function App() {
  return (
    <>
      <GlobalStyle /> {/* Doesn't accept children so it has to be sibling */}
      <h1>Hello</h1>
    </>
  );
}
```

---

# 🎯 9. Theming (VERY IMPORTANT)

Styled-components supports themes.

```jsx
import { ThemeProvider } from "styled-components";

const theme = {
  primary: "blue",
  secondary: "gray",
};

const Button = styled.button`
  background: ${(props) => props.theme.primary};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Themed Button</Button>
    </ThemeProvider>
  );
}
```

---

# ⚡ 10. Key Advantages

- No class name bugs
- Dynamic styling
- Scoped CSS
- Cleaner React structure
- Great for large apps

---

# ⚠️ Common Mistakes (avoid these)

❌ Forgetting backticks:

```js
styled.div(); // wrong
```

✅ Correct:

```js
styled.div``;
```

---

❌ Not passing `className` in custom components
👉 This breaks styling

---

# 🧪 11. Real Example

```jsx
import styled from "styled-components";

const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: ${(props) => (props.highlight ? "#ffeeba" : "#f8f9fa")};
`;

function App() {
  return <Card highlight>Styled Components is awesome 🚀</Card>;
}
```

---

# 🧭 When to Use Styled Components

Use it when:

- You want component-based styling
- You need dynamic styles
- You're building scalable UI systems

Avoid it when:

- You prefer utility-first (like Tailwind)
- Performance is extremely critical (rare cases)

---

# 💡 Want to Go Next Level?

I can walk you through:

- building a full UI with styled-components
- animation with `keyframes`
- responsive design patterns
- structuring large projects
- hovering

Just tell me 👍
