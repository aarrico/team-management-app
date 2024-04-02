import React from 'react';
import { Box, Typography } from '@mui/material';

function TeamMemberFormHeader({ isEdit = false }) {
  const title = `${isEdit ? 'Edit' : 'Add a'} team member`;
  const subtitle = `${
    isEdit ? 'Edit contact info' : 'Set email'
  }, location and role.`;

  return (
    <Box marginBottom={4}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
}

export default TeamMemberFormHeader;
