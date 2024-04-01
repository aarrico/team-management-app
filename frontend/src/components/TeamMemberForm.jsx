import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TeamMemberForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const teamMemberId = id !== 'add' ? id : '';

  const TEAM_API_URL = process.env.REACT_APP_TEAM_API_URL;

  const title = `${teamMemberId ? 'Edit' : 'Add a'} team member`;
  const subtitle = `${
    teamMemberId ? 'Edit contact info' : 'Set email'
  }, location and role.`;

  useEffect(() => {
    async function fetchEditData() {
      try {
        const response = await axios.get(`${TEAM_API_URL}${teamMemberId}`);

        const teamMemberData = response.data;
        setFormData({
          firstName: teamMemberData.firstName,
          lastName: teamMemberData.lastName,
          email: teamMemberData.email,
          phone: teamMemberData.phone,
          role: teamMemberData.role,
        });
      } catch (err) {
        console.log('Error fetching team member:', err);
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
        console.log('updated team member!', response.data);
      } else {
        const response = await axios.post(`${TEAM_API_URL}`, formData);
        console.log(`added team member!`, response.data);
      }
    } catch (err) {
      console.log(
        `error ${teamMemberId ? 'updating' : 'adding'} team member\n${teamMemberId || ''}`,
        err
      );
    }

    navigate('/');
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(`${TEAM_API_URL}${teamMemberId}`, {
        deletedAt: new Date().toJSON(),
      });
      console.log('deleted team member!', response.data);
    } catch (err) {
      console.error('Error deleting team member:', err);
    }

    navigate('/');
  }

  return (
    <>
      <h1>
        <b>{title}</b>
      </h1>
      <h4>{subtitle}</h4>
      <hr />

      <form onSubmit={handleSubmit}>
        <h5>Info</h5>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <h5>Role</h5>
        <label>
          {' '}
          Regular - Can&apos;t delete members
          <input
            type="radio"
            name="role"
            value="REGULAR"
            checked={
              teamMemberId ? formData.role.toLowerCase() === 'regular' : true
            }
            onChange={handleChange}
            id="reg-role"
          />
        </label>
        <label>
          Admin - Can delete members
          <input
            type="radio"
            name="role"
            value="ADMIN"
            checked={
              teamMemberId ? formData.role.toLowerCase() === 'admin' : false
            }
            onChange={handleChange}
          />
        </label>
        <br />
        {teamMemberId && (
          <button type="button" name="delete" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button type="submit" name="save">
          Save
        </button>
      </form>
    </>
  );
}

export default TeamMemberForm;
