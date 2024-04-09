import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import TeamMemberRoleSelection from './TeamMemberRoleSelection';
import TeamMemberInfo from './TeamMemberInfo';
import { decodeBackendError, TEAM_API_URL } from '../../utils';

const emptyTeamMember = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'regular',
};

function TeamMemberForm({ teamMemberId }) {
  const [formData, setFormData] = useState({ ...emptyTeamMember });

  const { control, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: formData,
  });
  const navigate = useNavigate();

  function updateForm(data) {
    setFormData(data);
    reset(data);
  }

  function clearForm() {
    const cleared = { ...emptyTeamMember };
    setFormData(cleared);
    reset(cleared);
  }

  function handleError(err) {
    let toastMsg = err.message;
    if (err.response || err.request) {
      toastMsg = decodeBackendError(err.response || err.request, toast.error);
    }

    toast.error(toastMsg);
  }

  useEffect(() => {
    async function fetchEditData() {
      try {
        const response = await axios.get(`${TEAM_API_URL}${teamMemberId}`);
        updateForm({ ...response.data });
      } catch (err) {
        handleError(err);
        navigate('/');
      }
    }
    if (teamMemberId) {
      fetchEditData();
    }
  }, [teamMemberId]);

  async function onSubmit(data) {
    try {
      if (teamMemberId) {
        const response = await axios.put(
          `${TEAM_API_URL}${teamMemberId}`,
          data
        );
        toast.success(
          `${response.data.firstName} ${response.data.lastName}'s info updated!`
        );
      } else {
        const response = await axios.post(`${TEAM_API_URL}`, data);
        toast.success(
          `Saved ${response.data.firstName} ${response.data.lastName} as a new team member!`
        );
      }
    } catch (err) {
      handleError(err);
    }

    clearForm();
    navigate('/');
  }

  async function onDelete() {
    try {
      const response = await axios.delete(`${TEAM_API_URL}${teamMemberId}`);
      toast.success(`${response.data.message}`);
      clearForm();
      navigate('/');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={2} marginBottom={3} marginTop={2}>
        <TeamMemberInfo control={control} formData={formData} />

        <Grid item xs={12}>
          <TeamMemberRoleSelection control={control} role={formData.role} />
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'left' }}>
          {teamMemberId && (
            <Button
              variant="outlined"
              name="delete"
              onClick={onDelete}
              sx={{ color: 'red', borderColor: '#dcdcdc' }}
            >
              Delete
            </Button>
          )}
          {!teamMemberId && (
            <Button
              variant="outlined"
              name="reset-form-button"
              onClick={clearForm}
            >
              Reset Form
            </Button>
          )}
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
