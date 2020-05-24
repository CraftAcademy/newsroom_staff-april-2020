import React from 'react';
import { Form, Button, Label, Input } from 'semantic-ui-react';
import auth from '../modules/auth'

const LoginForm = () => {

  const logIn = (e) => {
    try {
      auth.signIn(e.target.email.value, e.target.password.value)
    } catch(error) {
      debugger
    }
  }

  return (
    <Form  onSubmit={logIn} id="login-form" widths='equal' >
      <Label>Email</Label>
      <Input name='email' type='email' id='email'></Input>
      <Label>Password</Label>
      <Input name='password' type='password' id='password'></Input>
      <Button id='submit'>Submit</Button>
    </Form>
  )
}

export default LoginForm;
