import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
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
        <IconButton
          component={Link}
          to="/add"
          variant="contained"
          sx={{ backgroundColor: 'transparent' }}
          aria-label="add new team member"
          size="large"
          color="primary"
        >
          <Add fontSize="inherit" />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: 50 }}>
          Team members
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 24 }}>
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
