import React, { Component } from 'react';
import { Form, Container, Header, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      emailError: '',
      passwordError: '',
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    const response = await this.props.mutate({
      variables: { email, password },
    });
    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('@slack-token', token);
      localStorage.setItem('@slack-refresh-token', refreshToken);
      return this.props.history.push('/home');
    }

    const err = {};
    errors.forEach(({ path, message }) => {
      err[`${path}Error`] = message;
    });

    this.setState(err);
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;

    const errorList = [passwordError, emailError].filter(
      error => error.length && error,
    );

    return (
      <Container text style={{ marginTop: '20px' }}>
        <Header as="h2">Login</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field error={!!emailError}>
            <label htmlFor="email">E-Mail</label>
            <Form.Input
              name="email"
              type="email"
              autoComplete="email"
              onChange={this.onChange}
              value={email}
              placeholder="E-Mail"
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <label htmlFor="password">Password</label>
            <Form.Input
              name="password"
              type="password"
              onChange={this.onChange}
              value={password}
              placeholder="Password"
            />
          </Form.Field>
          <Form.Button content="Submit" />
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was an error during registration."
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
