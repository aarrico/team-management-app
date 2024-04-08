import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import TeamMemberRoleSelection from './TeamMemberRoleSelection';
import TeamMemberInfo from './TeamMemberInfo';
import { TEAM_API_URL } from '../../utils';

const emptyTeamMember = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'REGULAR',
};

function TeamMemberForm({ teamMemberId }) {
  const [formData, setFormData] = useState({ ...emptyTeamMember });

  const { control, reset, handleSubmit } = useForm({
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

  useEffect(() => {
    async function fetchEditData() {
      try {
        const response = await axios.get(`${TEAM_API_URL}${teamMemberId}`);
        updateForm({ ...response.data });
      } catch (err) {
        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            toast.error(`Team member with given ID does not exist!`);
          } else if (err.response.status === 500) {
            toast.error('There was a problem connecting to the server.');
          } else {
            toast.error(`Error fetching team member: ${err}`);
          }
        }

        navigate('/');
      }
    }
    if (teamMemberId) {
      fetchEditData();
    }
  }, [teamMemberId]);

  async function onSubmit(data) {
    console.log(data);
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
      if (err.response.status === 500) {
        toast.error('There was a problem connecting to the server.');
      } else {
        toast.error(
          `Error ${teamMemberId ? 'updating' : 'adding'} team member: ${err}`
        );
      }
    }

    clearForm();
    navigate('/');
  }

  async function onDelete() {
    try {
      await axios.delete(`${TEAM_API_URL}${teamMemberId}`);
      toast.success(`Team memeber was removed successfully.`);
    } catch (err) {
      if (err.response.status === 404) {
        toast.error(`Team member with given ID does not exist!`);
      } else if (err.response.status === 500) {
        toast.error('There was a problem connecting to the server.');
      } else {
        toast.error(`Error deleting
         team member: ${err}`);
      }
    }

    clearForm();
    navigate('/');
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={2} marginBottom={3} marginTop={2}>
        <TeamMemberInfo control={control} formData={formData} />

        <Grid item xs={12}>
          <TeamMemberRoleSelection control={control} role={formData.role} />
        </Grid>

        <Grid item xs={6}>
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
