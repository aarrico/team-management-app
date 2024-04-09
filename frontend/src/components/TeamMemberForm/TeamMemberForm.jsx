import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import TeamMemberRoleSelection from './TeamMemberRoleSelection';
import TeamMemberInfo from './TeamMemberInfo';

function TeamMemberForm({
  formData,
  handleSubmit,
  onDelete,
  resetForm,
  control,
}) {
  const isEditMode = formData.id !== '';
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container rowSpacing={2} marginBottom={3} marginTop={2}>
        <TeamMemberInfo control={control} formData={formData} />

        <Grid item xs={12}>
          <TeamMemberRoleSelection control={control} role={formData.role} />
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'left' }}>
          {isEditMode && (
            <Button
              variant="outlined"
              name="delete"
              onClick={onDelete}
              sx={{ color: 'red', borderColor: '#dcdcdc' }}
            >
              Delete
            </Button>
          )}

          <Button
            variant="outlined"
            name="reset-form-button"
            onClick={() => resetForm(isEditMode)}
          >
            Reset Form
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button type="submit" name="save" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamMemberForm;
