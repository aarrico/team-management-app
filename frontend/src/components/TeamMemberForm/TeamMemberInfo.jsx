/* eslint-disable react/jsx-no-bind */

import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
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
    <>
      <Grid item xs={12}>
        <Typography variant="h5" marginBottom={2}>
          Info
        </Typography>
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
          helperText={!firstName && 'Field cannot be blank.'}
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
          helperText={!lastName && 'Field cannot be blank.'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          placeholder="Email"
          required
          fullWidth
          autoComplete="off"
          error={emailError || !email}
          helperText={
            (emailError || !email) &&
            'Provide email in the form of user@domain.xyz.'
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
          placeholder="Phone Number"
          required
          fullWidth
          autoComplete="off"
          error={phoneNumberError || !phone}
          helperText={
            (phoneNumberError || !phone) &&
            'Provide a 10-digit US based number.'
          }
        />
      </Grid>
    </>
  );
}

export default TeamMemberInfo;
