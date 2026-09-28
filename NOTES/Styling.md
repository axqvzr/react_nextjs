- styling options : tailwind, css modules, external css/scss files, inline css, etc

> ## CSS MODULES

- Create one external CSS file per component.

- Name of the file should be the same as component file name. Example : `Navbar.jsx then Navbar.module.css`

- We `cannot use element for styling` css. Example `a { text-decoration : none; }`

- We should import as `import styles from './Navbar.module.css'`. We can directly destructure them as well like `import { nav } from "./Navbar.module.css"`
  - Use it as `<a href="#" className={styles.nav} >hello</a>`

- To make any styling global follow below
  - `:global(.test) { background-color : red; }`
