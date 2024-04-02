import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

function TeamMemberCard({
  member: { id, firstName, lastName, email, phone, role, profilePicSrc = '' },
}) {
  const displayName = `${firstName} ${lastName}${
    role.toLowerCase() === 'admin' ? ' (admin)' : ''
  }`;

  return (
    <Card
      variant="plain"
      component={Link}
      to={`/${id}`}
      style={{ textDecoration: 'none' }}
      sx={{
        display: 'flex',
        marginBottom: '50',
        width: 'fit-content',
        alignItems: 'column',
      }}
    >
      <CardHeader
        avatar={<Avatar alt={`${displayName}`} src={profilePicSrc} />}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ padding: '50' }}>
          <Typography variant="h5" component="h2">
            <Box sx={{ fontWeight: 'bold' }}>{displayName}</Box>
          </Typography>
          <Typography color="textSecondary">{phone}</Typography>
          <Typography color="textSecondary">{email}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TeamMemberCard;
