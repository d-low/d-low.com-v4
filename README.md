# d-low.com-v4

This is the latest iteration of my personal website d-low.com which chronicles adventurous and less
adventurous things I've done in my life. This iteration is merely a port of the previous design and
functionality from React to Vue 3. I've been working in Vue professionally for 4 or 5 years now, so
when I began to realize my personal website was dated and running on legacy libraries and code, I
took the opportunity to port it to Vue 3.

d-low.com is a file based blog. All configuration for the site is loaded from [content.js](https://d-low.com/data/content.js)
which is dynamically generated the file system layout in the `/data` directory by the
[data/generate_content.rb](data/generate_content.rb) script.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/)

```sh
npm run lint
```
