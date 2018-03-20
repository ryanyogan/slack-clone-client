import React from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import { normalizeErrors } from '../lib/helpers';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors,
  touched,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fluid
            placeholder="User's E-Mail..."
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Form.Group widths="equal">
          <Button disabled={isSubmitting} onClick={onClose} fluid>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Add User
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMembmerMutation = gql`
  mutation($email: String!, $teamId: ID!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMembmerMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (
      values,
      { props: { teamId, mutate, onClose }, setSubmitting, setErrors },
    ) => {
      const response = await mutate({
        variables: {
          teamId,
          email: values.email,
        },
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        onClose();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    },
  }),
)(InvitePeopleModal);
