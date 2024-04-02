import React from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Divider,
  Radio,
  Typography,
} from '@mui/material';

function TeamMemberRoleSelection({ role, handleChange }) {
  return (
    <Container sx={{ marginBottom: 4 }}>
      <Typography variant="h5" marginBottom={1}>
        Role
      </Typography>
      <FormGroup>
        <FormControl>
          <RadioGroup
            aria-label="role selection"
            name="role"
            value={role.toUpperCase()}
            onChange={handleChange}
          >
            <FormControlLabel
              value="REGULAR"
              control={<Radio />}
              label="Regular - Can't delete members"
              labelPlacement="start"
              sx={{ justifyContent: 'space-between', marginBottom: 1 }}
            />
            <Divider />

            <FormControlLabel
              value="ADMIN"
              control={<Radio />}
              label="Admin - Can delete members"
              labelPlacement="start"
              sx={{ justifyContent: 'space-between', marginBottom: 1 }}
            />
            <Divider />
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </Container>
  );
}

export default TeamMemberRoleSelection;
