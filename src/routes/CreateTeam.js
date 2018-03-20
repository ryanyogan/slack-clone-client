import React, { Component } from 'react';
import { Form, Container, Header, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CreateTeam extends Component {
  state = {
    name: '',
    nameError: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      nameError: '',
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    try {
      const { name } = this.state;
      const response = await this.props.mutate({
        variables: { name },
      });
      const { ok, team, errors } = response.data.createTeam;

      if (ok) {
        this.props.history.push(`/teams/${team.id}`);
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.setState(err);
      }
    } catch (error) {
      this.props.history.push('/login');
    }
  };

  render() {
    const { name, nameError } = this.state;

    const errorList = [nameError].filter(error => error.length && error);

    return (
      <Container text style={{ marginTop: '20px' }}>
        <Header as="h2">Create Team</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field error={!!nameError}>
            <label htmlFor="name">Team Name</label>
            <Form.Input
              name="name"
              type="text"
              autoComplete="name"
              onChange={this.onChange}
              value={name}
              placeholder="Team Name"
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

const createTeamMutation = gql`
  mutation CreatTeam($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(CreateTeam);
