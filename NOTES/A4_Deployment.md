> # DEPLOYMENT

> ## netlify

- `npm run build`
  - will create dist folder : this is what we will upload
  - `Create netlify.toml file` &rarr; Move inside dist folder
    - `touch netlify.toml` and add below
      ```
      [[redirects]]
      from = "/*"
      to = "/index.html"
      status = 200
      ```
  - `BEST create netlify.toml file inside public folder` so that it will automatically be created everytime we run &rarr; npm run build

- Go to netlify
  - Add new site &rarr; Deploy manually
  - Upload that dist folder


### USING GIT &rarr; Continous deployment

- Push to github or gitlab
- Connect that repo to netlify
    - Add new site
    - Import and existing project
    - Choose github/gitlab
    - Choose that repo


> ## vercel
- used especially for nextjs but we can also used for react apps

Advantages
- automatically runs &rarr; npm run build
