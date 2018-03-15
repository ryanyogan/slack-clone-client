import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Form, Container, Header } from 'semantic-ui-react';

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: '',
        password: ''
      });
    }

    onChange = ({ target: { name, value } }) => (this[name] = value);

    onSubmit = () => {
      console.log(this);
    };

    render() {
      const { email, password } = this;

      return (
        <Container text style={{ marginTop: '20px' }}>
          <Header as="h2">Login</Header>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
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
            <Form.Field>
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
        </Container>
      );
    }
  }
);
