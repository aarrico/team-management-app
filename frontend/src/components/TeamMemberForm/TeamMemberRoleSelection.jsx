import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Divider,
  Radio,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

function TeamMemberRoleSelection({ control, role }) {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" marginBottom={1}>
        Role
      </Typography>
      <FormGroup>
        <FormControl component="fieldset">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-label="role selection"
                name="role"
                defaultValue={role.toLowerCase()}
              >
                <FormControlLabel
                  value="regular"
                  control={<Radio />}
                  label="Regular - Can't delete members"
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between', marginBottom: 1 }}
                />
                <Divider />

                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin - Can delete members"
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between', marginBottom: 1 }}
                />
                <Divider />
              </RadioGroup>
            )}
          />
        </FormControl>
      </FormGroup>
    </Box>
  );
}

export default TeamMemberRoleSelection;
