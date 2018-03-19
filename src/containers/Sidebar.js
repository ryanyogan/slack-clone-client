import React, { Component } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
  };

  handleAddChannelClick = () => this.setState({ openAddChannelModal: true });

  handleAddChannelCloseClick = () =>
    this.setState({ openAddChannelModal: false });

  render() {
    const { team, teams } = this.props;
    let username = '';

    try {
      const token = localStorage.getItem('@slack-token');
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
      console.error(err); // eslint-disable-line
    }

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'Slackbot' }, { id: 2, name: 'User 1' }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        key={'sidebar-add-channel-modal'}
        open={this.state.openAddChannelModal}
        onClose={this.handleAddChannelCloseClick}
      />,
    ];
  }
}

export default Sidebar;
