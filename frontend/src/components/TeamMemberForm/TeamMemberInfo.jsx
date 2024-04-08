import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Controller } from 'react-hook-form';
import { isEmailValid } from '../../utils';

function TeamMemberInfo({
  control,
  formData: { firstName, lastName, email, phone },
}) {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" marginBottom={2}>
          Info
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="firstName"
          defaultValue={firstName || ''}
          control={control}
          rules={{ required: true }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <TextField
              {...fieldProps}
              value={value ?? ''}
              inputRef={fieldRef}
              helperText={fieldState.invalid ? 'First name is required' : ''}
              error={fieldState.invalid}
              placeholder="First Name"
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="lastName"
          defaultValue={lastName || ''}
          control={control}
          rules={{ required: true }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <TextField
              {...fieldProps}
              value={value ?? ''}
              inputRef={fieldRef}
              helperText={fieldState.invalid ? 'Last name is required' : ''}
              error={fieldState.invalid}
              placeholder="Last Name"
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="email"
          defaultValue={email || ''}
          control={control}
          rules={{
            required: true,
            validate: (value) => isEmailValid(value),
          }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <TextField
              {...fieldProps}
              value={value ?? ''}
              inputRef={fieldRef}
              helperText={
                fieldState.invalid
                  ? 'Email is should be in the form user@domain.com'
                  : ''
              }
              error={fieldState.invalid}
              variant="outlined"
              placeholder="member@team.com"
              fullWidth
              autoComplete="off"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="phone"
          defaultValue={phone || ''}
          control={control}
          rules={{
            required: true,
            validate: (value) => matchIsValidTel(value),
          }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <MuiTelInput
              {...fieldProps}
              value={value ?? ''}
              inputRef={fieldRef}
              helperText={fieldState.invalid ? 'Phone is invalid' : ''}
              error={fieldState.invalid}
              forceCallingCode
              defaultCountry="US"
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
          )}
        />
      </Grid>
    </>
  );
}

export default TeamMemberInfo;
