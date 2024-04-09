import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Controller } from 'react-hook-form';
import { isEmailValid } from '../../utils';

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#000',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000',
      borderWidth: '2px',
    },
    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#071eed',
        borderWidth: '2px',
      },
    },
  },
};

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
            <>
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <TextField
                {...fieldProps}
                id="first-name"
                aria-describedby="first-name-helper-text"
                value={value ?? ''}
                inputRef={fieldRef}
                error={fieldState.invalid}
                placeholder="First Name"
                variant="outlined"
                fullWidth
                autoComplete="off"
                sx={textFieldStyle}
              />
              <FormHelperText id="first-name-helper-text">
                {fieldState.invalid ? 'First name is required' : ''}
              </FormHelperText>
            </>
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
            <>
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <TextField
                {...fieldProps}
                id="last-name"
                aria-describedby="last-name-helper-text"
                value={value ?? ''}
                inputRef={fieldRef}
                error={fieldState.invalid}
                title="last-name"
                placeholder="Last Name"
                variant="outlined"
                fullWidth
                autoComplete="off"
                sx={textFieldStyle}
              />
              <FormHelperText id="last-name-helper-text">
                {fieldState.invalid ? 'Last name is required' : ''}
              </FormHelperText>
            </>
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
            <>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                {...fieldProps}
                id="email"
                type="email"
                aria-describedby="email-helper-text"
                value={value ?? ''}
                inputRef={fieldRef}
                error={fieldState.invalid}
                variant="outlined"
                placeholder="member@team.com"
                fullWidth
                autoComplete="off"
                sx={textFieldStyle}
              />
              <FormHelperText id="email-helper-text">
                {fieldState.invalid
                  ? 'Email is should be in the form user@domain.com'
                  : ''}
              </FormHelperText>
            </>
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
            <>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <MuiTelInput
                {...fieldProps}
                value={value ?? ''}
                id="phone"
                aria-describedby="phone-helper-text"
                inputRef={fieldRef}
                error={fieldState.invalid}
                forceCallingCode
                defaultCountry="US"
                variant="outlined"
                fullWidth
                autoComplete="off"
                sx={textFieldStyle}
                onlyCountries={['US']}
              />
              <FormHelperText id="phone-helper-text">
                {fieldState.invalid ? 'Phone is invalid' : ''}
              </FormHelperText>
            </>
          )}
        />
      </Grid>
    </>
  );
}

export default TeamMemberInfo;
