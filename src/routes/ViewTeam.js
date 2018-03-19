import React from 'react';
import { graphql } from 'react-apollo';

import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({
  data: { loading, allTeams },
  match: { params: { teamId, channelId } },
}) => {
  if (loading) {
    return null;
  }

  const team = teamId
    ? allTeams.filter(t => parseInt(t.id, 10) === parseInt(teamId, 10))[0]
    : allTeams[0];

  const channel = channelId
    ? team.channels.filter(
        t => parseInt(t.id, 10) === parseInt(channelId, 10),
      )[0]
    : team.channels[0];

  return (
    <AppLayout>
      <Header channelName={channel.name} />
      <Sidebar
        team={team}
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
