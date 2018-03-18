import React from 'react';

import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

const ViewTeam = () => (
  <AppLayout>
    <Header channelName="general" />
    <Sidebar currentTeamId={7} />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);

export default ViewTeam;
