import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Container } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import TeamMemberFormHeader from './TeamMemberFormHeader';
import TeamMemberForm from './TeamMemberForm';

import { decodeBackendError, TEAM_API_URL } from '../../utils';

const emptyTeamMember = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'regular',
};

function TeamMemberFormPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const teamMemberId = id !== 'add' ? id : undefined;

  const [formData, setFormData] = useState({ ...emptyTeamMember });
  const [orginialData, setOriginalData] = useState({ ...emptyTeamMember });

  const { control, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: formData,
  });

  function updateForm(data) {
    setFormData(data);
    reset(data);
  }

  function resetForm(restoreData = false) {
    if (restoreData) {
      const data = { ...orginialData };
      setFormData(data);
      reset(data);
    } else {
      const cleared = { ...emptyTeamMember };
      setFormData(cleared);
      reset(cleared);
    }
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
        setOriginalData({ ...response.data });
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

    resetForm();
    navigate('/');
  }

  async function onDelete() {
    try {
      const response = await axios.delete(`${TEAM_API_URL}${teamMemberId}`);
      toast.success(`${response.data.message}`);
      resetForm();
      navigate('/');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <Container>
      <TeamMemberFormHeader isEdit={teamMemberId} clearForm={resetForm} />
      <Divider />
      <TeamMemberForm
        formData={formData}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        onDelete={onDelete}
        resetForm={resetForm}
      />
    </Container>
  );
}

export default TeamMemberFormPage;
