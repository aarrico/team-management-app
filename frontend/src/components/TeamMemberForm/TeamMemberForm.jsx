/* eslint-disable react/jsx-no-bind */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

import TeamMemberRoleSelection from './TeamMemberRoleSelection';
import TeamMemberInfo from './TeamMemberInfo';
import { formatPhoneNumber, TEAM_API_URL } from '../../utils';

function TeamMemberForm({ teamMemberId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'REGULAR',
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEditData() {
      try {
        const response = await axios.get(`${TEAM_API_URL}${teamMemberId}`);

        setFormData({
          ...response.data,
          phone: formatPhoneNumber(response.data.phone),
        });
      } catch (err) {
        toast.error(`Error fetching team member`, err);
      }
    }
    if (teamMemberId) {
      fetchEditData();
    }
  }, [teamMemberId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (teamMemberId) {
        const response = await axios.put(
          `${TEAM_API_URL}${teamMemberId}`,
          formData
        );
        toast.success(
          `${response.data.firstName} ${response.data.lastName}'s updated!`
        );
      } else {
        const response = await axios.post(`${TEAM_API_URL}`, formData);
        toast.success(
          `Saved ${response.data.firstName} ${response.data.lastName} as a new team member!`
        );
      }
    } catch (err) {
      toast.error(
        `Error ${teamMemberId ? 'updating' : 'adding'} team member`,
        err
      );
    }

    navigate('/');
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await axios.delete(`${TEAM_API_URL}${teamMemberId}`);
      toast.success(`Team memeber was removed successfully.`);
    } catch (err) {
      toast.error(`Error deleting team member.`);
    }

    navigate('/');
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container rowSpacing={2} marginBottom={3} marginTop={2}>
        <TeamMemberInfo formData={formData} handleChange={handleChange} />

        <Grid item xs={12}>
          <TeamMemberRoleSelection
            role={formData.role}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          {teamMemberId && (
            <Button
              variant="outlined"
              name="delete"
              onClick={handleDelete}
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
