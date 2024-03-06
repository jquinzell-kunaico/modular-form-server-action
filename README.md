# Reproducing Errors

Having issues using server$

## Importing a server$

If I try to define a `server$` function and export it, I get an error saying `Qrl($) scope is not a function, but it's capturing local identifiers: values`

See this in the `/imported` route.

## Inline server$

If I just put my `server$` in the same file as my component, everything works in this repo. But in another repo I am getting this error

See in `/inline` route

```
Found 'submitData$' but did not find the corresponding 'submitDataQrl' exported in the same file. Please check that it is exported and spelled correctly
```

Will continue trying to reproduce this here.
