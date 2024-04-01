import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TeamMemberCard from './TeamMemberCard';

function TeamListPage() {
  const [team, setTeam] = useState([]);
  const TEAM_API_URL = process.env.REACT_APP_TEAM_API_URL;

  useEffect(() => {
    async function fetchMembers() {
      const result = await axios.get(TEAM_API_URL);
      setTeam(result.data);
    }
    fetchMembers();
  }, []);

  return (
    <Container>
      <Box sx={{ position: 'fixed', top: 5, right: 5, zIndex: 2000 }}>
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
      <Grid container spacing={5} justify="center">
        {team.map((member) => (
          <Grid item xs={12} key={member.id}>
            <TeamMemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TeamListPage;
