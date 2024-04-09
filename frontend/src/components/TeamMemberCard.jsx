/* eslint-disable react/no-children-prop */
import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';

function TeamMemberCard({
  member: { id, firstName, lastName, email, phone, role, profilePicSrc = '' },
}) {
  const isAdmin = role.toLowerCase() === 'admin';
  const displayName = `${firstName} ${lastName}${isAdmin ? ' (admin)' : ''}`;
  const avatar = profilePicSrc ? (
    <Avatar alt={`${displayName}`} src={profilePicSrc} />
  ) : (
    <Avatar
      alt={`${displayName}`}
      sx={{ bgcolor: isAdmin ? '#9c27b0' : '#294eb2' }}
      children={`${firstName[0]}${lastName[0]}`}
    />
  );

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
      <CardHeader avatar={avatar} />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ padding: '50' }}>
          <Typography variant="h5" component="h3">
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
