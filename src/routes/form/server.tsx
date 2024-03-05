import { server$ } from '@builder.io/qwik-city'

export const serverThing$ = server$((email: string) => {
  console.log('on server', email)
  return email.toUpperCase()
})
