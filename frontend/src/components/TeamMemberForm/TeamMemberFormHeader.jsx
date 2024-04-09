import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function TeamMemberFormHeader({ isEdit = false, clearForm }) {
  const title = `${isEdit ? 'Edit' : 'Add a'} team member`;
  const subtitle = `${
    isEdit ? 'Edit contact info' : 'Set email'
  }, location and role.`;

  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        <IconButton
          component={Link}
          to="/"
          variant="contained"
          sx={{ backgroundColor: 'transparent' }}
          aria-label="go to team member list"
          color="primary"
          size="large"
          onClick={clearForm}
        >
          <Home fontSize="inherit" />
        </IconButton>
      </Box>
      <Box marginBottom={4}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="h5">{subtitle}</Typography>
      </Box>
    </>
  );
}

export default TeamMemberFormHeader;
