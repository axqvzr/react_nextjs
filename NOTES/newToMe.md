> # learn this

- `math.abs()`

- `disabled` attribute in html input element

  ```html
  <input type="text" disabled />
  ```

- `crypto.randomUUID`

- &copy; &cross; &check; &larr; &rarr; &gt; &lt; &colon; &dollar; &amp; &pound; &comma; &quest; &quot; &excl; &squ; &rect; &cir; &par; &plus; &minus; &divide; &rbrack; &lbrack; &mu; &top; &bot; &le; &ge; &ap; &sc;

- Hovering : `onMouseEnter`, `onMouseLeave`

- react built-in `PropType` type checking

  ```js
  import PropTypes from "prop-types"; // import using capital P but used uisng lower p

  user.propTypes = {
    age: PropTypes.number,
    name: PropTypes.string.isRequired,
  };

  /* NOT recommeded nowadays. Use Typescript instead of javascript. */
  ```

- Event propagation and delegation
  `e.stopPropagation()`

- `stale : outdated, notfresh, old`

- `res.ok` if res is variable/response then .ok means res exists or res value/data exists.

- `new AbortController()`, something like browser api(just search)

---
- `JSON Server`
```json 
"scripts" : {
  "server" : "json-server --watch data/question.json --port 8000 --delay 500"
}
```
- Install json-server
- Suppose json data is in data folder then add above to package.json file
- To run : `npm run server`
---

- for vite react app `npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev`
  - touch .eslintrc.json then add below
    - `{ "extends": "react-app" }`
  - Import eslint and add eslint in plugins arrays in `vite.config.js`

- `new Audio()` : To use audio files. 

- `clousre` in javascript

- `prettier plugin tailwindcss` - arranges tailwind classes

- Apply tailwind directly at body at index.html and use class instead of className as it is html not jsx
  - disabled, placeholder:, active:, hover:, focous:, accent-yellow-400, @layer @apply theme extend, backdrop-blur-sm, divide-x/y divide-stone-300, 

- `emoji as a favicon` 

- `value and defaultValue in HTML input field.`

- `input type hidden in HTML input field`

- `reselect library`

- `CSS GRID : grid-row : 1 / -1` start from first till last

- `we can do optional chaining in function as well. function?()`

- `npm i react-error-boundary`