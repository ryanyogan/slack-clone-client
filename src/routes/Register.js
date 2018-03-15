import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Container, Header, Message } from 'semantic-ui-react';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    passwordError: '',
    emailError: ''
  };

  onChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
      usernameError: '',
      passwordError: '',
      emailError: ''
    });

  onSubmit = async e => {
    e.preventDefault();

    const { username, password, email } = this.state;
    const response = await this.props.mutate({
      variables: { username, password, email }
    });
    const { ok, errors } = response.data.register;

    if (ok) {
      return this.props.history.push('/home');
    }

    const err = {};
    errors.forEach(({ path, message }) => {
      err[`${path}Error`] = message;
    });

    this.setState(err);
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      passwordError,
      emailError
    } = this.state;

    const errorList = [usernameError, passwordError, emailError].filter(
      error => error.length && error
    );

    return (
      <Container text style={{ marginTop: '20px' }}>
        <Header as="h2">Register</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <Form.Input
              error={!!usernameError}
              name="username"
              autoComplete="username"
              onChange={this.onChange}
              value={username}
              placeholder="Username"
              fluid
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">E-Mail</label>
            <Form.Input
              error={!!emailError}
              name="email"
              type="email"
              autoComplete="email"
              onChange={this.onChange}
              value={email}
              placeholder="E-Mail"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Form.Input
              error={!!passwordError}
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

const registerMutation = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
