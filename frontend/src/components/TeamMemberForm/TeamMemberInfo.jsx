/* eslint-disable react/jsx-no-bind */

import React, { useState } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import {
  isPhoneNumberValid,
  formatPhoneNumber,
  isEmailValid,
} from '../../utils';

function TeamMemberInfo({
  formData: { firstName, lastName, email, phone },
  handleChange,
}) {
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  function handleEmailChange(e) {
    if (!isEmailValid(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    handleChange(e);
  }

  function handlePhoneChange(e) {
    if (!isPhoneNumberValid(e.target.value)) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
      e.target.value = formatPhoneNumber(e.target.value);
    }
    handleChange(e);
  }

  return (
    <Box>
      <Grid item xs={12}>
        <Typography variant="h5">Info</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          error={!firstName}
          helperText={!firstName && 'Provide a first name.'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          error={!lastName}
          helperText={!lastName && 'Provide a last name.'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          error={emailError}
          helperText={
            emailError && 'Provide email in the form of user@domain.xyz.'
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          error={phoneNumberError}
          helperText={phoneNumberError && 'Provide a 10-digit US based number.'}
        />
      </Grid>
    </Box>
  );
}

export default TeamMemberInfo;
