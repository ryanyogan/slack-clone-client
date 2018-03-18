import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';

const Sidebar = ({ data: { allTeams, loading }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  const team = allTeams.filter(t => parseInt(t.id, 10) === currentTeamId)[0];

  let username = '';

  try {
    const token = localStorage.getItem('@slack-token');
    const { user } = decode(token);
    username = user.username;
  } catch (err) {
    console.error(err); // eslint-disable-line
  }

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      username={username}
      channels={team.channels}
      users={[{ id: 1, name: 'Slackbot' }, { id: 2, name: 'User 1' }]}
    />,
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
