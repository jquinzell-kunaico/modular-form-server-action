import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

import Header from '../components/starter/header/header'
import Footer from '../components/starter/footer/footer'

import styles from './styles.css?inline'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  }
})

export default component$(() => {
  useStyles$(styles)
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  )
})

import { routeLoader$ } from '@builder.io/qwik-city'
import { email, type Input, minLength, object, string } from 'valibot'
import type { InitialValues } from '@modular-forms/qwik'

const LoginSchema = object({
  email: string([
    minLength(1, 'Please enter your email.'),
    email('The email address is badly formatted.'),
  ]),
  password: string([
    minLength(1, 'Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.'),
  ]),
})

type LoginForm = Input<typeof LoginSchema>

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}))
