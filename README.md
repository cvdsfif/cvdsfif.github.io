# Nikit Zykov's website

![Coverage](./badges/coverage.svg)

For those who look into the site's code, there are few interesting technics used here:

- The site is built with [React](https://react.dev/) / [Vite](https://vite.dev/), as described [in this memo](https://medium.com/stackademic/creating-and-deploying-a-typescript-react-web-app-with-vite-quick-memo-5e99323cf63d?sk=72672b0e1277ee3516727f5f4298da31).
- The site's navigation structure is built with [Tanstack router](https://tanstack.com/router/latest). It uses few special techniques like [default routes](https://github.com/cvdsfif/cvdsfif.github.io/blob/main/src/routes/languages.lazy.tsx) and internationalization with router's context.
- It has 100% [test coverage](https://github.com/cvdsfif/cvdsfif.github.io/tree/main/tests/routes). Some tricky aspects of it are described [in this article](https://medium.com/stackademic/using-tanstack-router-in-react-spas-tdd-way-0aa7d2aabfff?sk=3b859aa49e74398655f3383ad00b25af).
- Downloadable components' size is optimized with Tanstack's lazy loaded routes and [PurgeCSS](https://purgecss.com/) plugin with [custom configuration](https://github.com/cvdsfif/cvdsfif.github.io/blob/main/vite.config.ts) to keep dynamic CSS classes in the loop.
- It has a couple of [built-in DApps](https://github.com/cvdsfif/cvdsfif.github.io/tree/main/tests/routes/it/ton) connected to the TON blockchain.
- It is connected to [Duolingo](https://www.duolingo.com/learn) using its (unofficial) API.
