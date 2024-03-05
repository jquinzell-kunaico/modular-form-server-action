import { $, component$, useSignal, type QRL } from '@builder.io/qwik'
import { routeLoader$, server$ } from '@builder.io/qwik-city'
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik'
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik'
import { type Input, minLength, object, string } from 'valibot'
// import {serverThing$ } from './server'

const serverThing$ = server$((email: string) => {
  console.log('on server', email)
  return email.toUpperCase()
})

const LoginSchema = object({
  email: string([minLength(1, 'Please enter your email.')]),
  password: string([minLength(1, 'Please enter your password.')]),
})

type LoginForm = Input<typeof LoginSchema>

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}))

export const useFormAction = formAction$<LoginForm>((values) => {
  // Runs on server
}, valiForm$(LoginSchema))

export default component$(() => {
  const result = useSignal('')
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: {
      value: {
        email: '',
        password: '',
      },
    },
    // action: useFormAction(),
    validate: valiForm$(LoginSchema),
  })

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $(
    async (values, event) => {
      // Runs on client
      console.log(values)
      result.value = await serverThing$(values.email)
    }
  )

  return (
    <>
      <Form onSubmit$={handleSubmit}>
        <Field name='email'>
          {(field, props) => (
            <div>
              <input {...props} type='email' value={field.value} />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name='password'>
          {(field, props) => (
            <div>
              <input {...props} type='password' value={field.value} />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <button type='submit'>Login</button>
      </Form>
      {result.value && <p>From server: {result.value}</p>}
    </>
  )
})
