# Reproducing Errors

When using `server$` from qwik there are some caveats to look out for.

The different variations I found are defined in `src/@app`. Each route just imports a different variation to demonstrate the behavior that happens.

Routes:

- /exported
- /imported
- /inline

## Importing a server$ from another file

If I try to define a `server$` function in a stand alone file then import it, I get an error saying `Qrl($) scope is not a function, but it's capturing local identifiers: values`

```ts
// server.ts
export const serverThing$ = server$((email: string) => {
  console.log('on server', email)
  return email.toUpperCase()
})

// component.tsx
import { serverThing } from './server.ts'

export default component$(...)
```

See this in the `/imported` route.

## Inline server$

If I just put my `server$` in the same file as my component, everything works in this repo.

```ts
// component.tsx
const serverThing$ = server$((email: string) => {
  console.log('on server', email)
  return email.toUpperCase()
})

// use serverThing$ in component
export default component$(...)
```

See in `/inline` route

## Exporting From Component

Do not accidentally export your `server$` function or you will get an error

```ts
// component.tsx

// this export breaks the build with error:
// Found 'serverThing$' but did not find the corresponding 'serverThingQrl' exported in the same file.
// Please check that it is exported and spelled correctly

export const serverThing$ = server$((email: string) => {
  console.log('on server', email)
  return email.toUpperCase()
})

// use serverThing$ in component
export default component$(...)
```
