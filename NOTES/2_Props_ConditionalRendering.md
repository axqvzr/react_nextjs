> # TABLE OF CONTENTS

- PROPS
- CONDITIONAL RENDERING (Terinary and &&)

> ## PROPS

- Props short for `property`. Props are just Object.

- `Unidirectional Data Flow` : Data with props can be passed down the component tree (from parent to child).

- `Read-Only (Immutable)`: A child component cannot modify the props it receives. If data needs to change, the parent component must update its own `state` and pass down a new prop value.

- `Reusable`: Props allow a single component to be rendered with different data, avoiding code repetition.

- `Any Data Type`: You can pass any JavaScript value as a prop, including strings, numbers, booleans, objects, arrays, and even functions.

### How to use props

- Pass props in the parent component: Add them as attributes in the JSX.

  ```js
  function Profile() {
    return (
      <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
      // Passing argument in object form in variable 'person'
    );
  }
  ```

- Read props in the child component: Access them as parameters in the function definition (functional components) or using this.props (class components). Destructuring is a common practice for cleaner code.

  ```js
  // Destructuring props
  function Avatar({ person, size }) {
    return (
      <img
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
    );
  }
  // PROPS object
  /*
   function Avatar(props) {
    return (
      <img
        src={getImageUrl(props.person)}
        alt={props.person.name}
        width={props.size}
        height={props.size}
      />
    );
  }
  */
  ```

> note : From where we call component and pass Argument that will be PARENT. And from where we access them as parameter is CHILD component.

### Special Props

- `children`: This special prop is used to pass JSX elements nested between the opening and closing tags of a component.

  ```jsx
  // use AI or doc to give example of children prop

  /* Whatever we pass in between opening and closing of element/component will be the children. */
  ```

  - Using Children prop we can pass whatever content we want which will be different from other component.

- `defaultProps`: This allows you to set default values for props that are not explicitly provided by the parent.
  ```jsx
  // use AI or doc to give exmaple of default prop
  export default function App({ greeting = "Hello!" }) {
    return <h1>{greeting}</h1>;
  }
  ```

> ## CONDITIONAL RENDERING

```js
const age = 18;
// age >= 18 ? "You can vote" : "You cann't vote"
age >= 18 && "You are adult"; // If 1st part true then only 2nd part will run, all must be true for true

/* age || "hi" 
    if age if false, hi will display, simply if first part is false second part will run, any value true makes true
*/

// Output : You are adult

/* 
    JSX, Display paragraph if age is true
    { age && <p>You are adult</p> }

     using terinary operator
     { age ? <p>You are adult</p> : null }
    */
```

### USE CASES

- Display login button if user is not authenticated

- We can use terinary operator to display alternative like if user is not authenticated display login button otherwise display profileIcon

- **_Why not to use If else statement? As it doesn't produce value_**

- We can conditionally set classes and text

> ## END
