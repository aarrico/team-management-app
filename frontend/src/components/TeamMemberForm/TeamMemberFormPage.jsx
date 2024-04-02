import React from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Container } from '@mui/material';
import TeamMemberFormHeader from './TeamMemberFormHeader';
import TeamMemberForm from './TeamMemberForm';

function TeamMemberFormPage() {
  const { id } = useParams();
  const teamMemberId = id !== 'add' ? id : undefined;

  return (
    <Container>
      <TeamMemberFormHeader isEdit={teamMemberId} />
      <Divider />
      <TeamMemberForm teamMemberId={teamMemberId} />
    </Container>
  );
}

export default TeamMemberFormPage;
