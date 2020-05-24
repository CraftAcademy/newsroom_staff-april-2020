import React from 'react';
import { Form, Button, Label, Input } from 'semantic-ui-react';

const LoginForm = (props) => {

  return (
    <Form  onSubmit={props.logIn} id="login-form" widths='equal' >
      <Label>Email</Label>
      <Input name='email' type='email' id='email'></Input>
      <Label>Password</Label>
      <Input name='password' type='password' id='password'></Input>
      <Button id='submit'>Submit</Button>
      <p id="error-message">{props.errorMessage}</p>
    </Form>
  )
}

export default LoginForm;
