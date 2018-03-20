import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

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

  if (!loading && !allTeams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInt = parseInt(teamId, 10);
  const channelIdInt = parseInt(channelId, 10);

  const team = teamIdInt
    ? allTeams.filter(t => parseInt(t.id, 10) === teamIdInt)[0]
    : allTeams[0];

  const channel = channelIdInt
    ? team.channels.filter(t => parseInt(t.id, 10) === channelIdInt)[0]
    : team.channels[0];

  return (
    <AppLayout>
      <Sidebar
        team={team}
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <Messages channelId={channel.id}>
          <ul className="message-list">
            <li />
            <li />
          </ul>
        </Messages>
      )}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
