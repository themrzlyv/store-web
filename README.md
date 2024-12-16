# [themirzaliyev.store](https://themirzaliyev.store)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./preview-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="./preview.png">
  <img alt="Website preview" src="./preview.png">
</picture>

## Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MySQL] and [Prisma ORM](https://prisma.io/)
- **Analytics**: [Umami](https://jahir.dev/analytics)
- **Deployment**: [Contabo](https://contabo.com)

## Project Structure

```bash
.
|____.github
| |____workflows
| | |____deploy.yml
|____prisma
| |____schema.prisma
|____src
| |____app
| |____assets
| | |____images
| | |____fonts
| |____lib
| |____middlewares
| |____modules
| |____shared
| |____styles
| |____ui
```

- **`content/*`** - MDX blog posts and the content for the `donate` pages
- **`public/*`** - Static assets including images, fonts, audios, files, etc.
- **`scripts/*`** - Utilities to setup the project
- **`src/app/*`** - Every page and API route in the website. Uses the new [App Router](https://beta.nextjs.org/docs/getting-started#introducing-the-app-router) from [Next.js](https://nextjs.org/) `13.+`
- **`src/assets/*`** - Fonts and static images used in different components
- **`src/components/core/*`** - The simplest components. Most of them are stateless
- **`src/components/molecules/*`** - The main blocks for the website: `toolbar`, `footer`, `main` layout, `back-to-top` button and `social links`
- **`src/components/og/*`** - The code that powers dynamic open-graph images generation
- **`src/components/views/*`** - More complex components to build the different pages of my website. _(They're here to keep `src/app/` as clean as possible)_
- **`src/components/icons.ts`** - SVG icon paths. Icons come from [Lucide](https://lucide.dev/)
- **`src/hooks/*`** - A couple hooks used throughout the app
- **`src/lib/*`** - Short for "library", a collection of helpful utilities or code for external services
- **`src/providers/*`** - React Contexts for storing the current theme and blog post reactions
- **`src/styles/*`** - Global styles with `scss`. Mostly use tailwind classes
- **`src/types/*`** - Some types definitions
- **`src/utils/*`** - More utilities functions but less complex than the ones in `lib`

<details>

<summary><strong>Note</strong></summary>

Some things might be broken or not found because the `bun run setup` script will remove many files.
Please double check the code and implementations.

</details>

## Cloning / Forking

Please review the [license](https://github.com/themrzlyv/store-web/blob/main/LICENSE), do not copy it directly, remove all of my personal content and files (resume, blog posts, images, etc.) by running `bun run setup` and please change the styling and colors to match your personal brand. You are free to use this code as inspiration or learning reference but this is not really intended to be a template.
