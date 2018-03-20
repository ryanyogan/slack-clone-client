import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
  padding-top: 10px;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background-color: #3e313c;
    cursor: pointer;
  }
  font-size: 14px;
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
  font-size: 18px;
  margin-bottom: 5px;
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/teams/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({
  teamName,
  teamId,
  username,
  channels,
  users,
  onAddChannelClick,
  onInvitePeopleClick,
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels <Icon onClick={onAddChannelClick} name="add circle" />
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
    <div>
      <Link to="#invite-people" onClick={onInvitePeopleClick}>
        + Invite People
      </Link>
    </div>
  </ChannelWrapper>
);
