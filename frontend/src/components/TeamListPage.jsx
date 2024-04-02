import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import TeamMemberCard from './TeamMemberCard';
import { TEAM_API_URL } from '../utils';

function TeamListPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const result = await axios.get(TEAM_API_URL);
        setTeam(result.data);
      } catch (err) {
        toast.error('Failed to retrieve team members.');
      }
    }
    fetchMembers();
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          component={Link}
          to="/add"
          variant="contained"
          sx={{ backgroundColor: 'transparent' }}
        >
          <Typography variant="h5" color="primary">
            +
          </Typography>
        </Button>
      </Box>
      <Box sx={{ marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Team members
        </Typography>
        <Typography variant="h5">
          You have {team.length} team member{team.length === 1 ? '' : 's'}.
        </Typography>
      </Box>
      <Divider />
      <Grid container spacing={5} justify="center">
        {team.map((member) => (
          <Grid item xs={12} key={member.id}>
            <TeamMemberCard member={member} />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TeamListPage;
