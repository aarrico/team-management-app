const emailRegexPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const TEAM_API_URL = 'http://localhost:8000/api/team/';

function isEmailValid(email) {
  return emailRegexPattern.test(email);
}

function decodeBackendError(err, toastErr) {
  if (err.status === 404) {
    toastErr(`Team member with given ID does not exist!`);
    return;
  }

  if (err.status === 400) {
    Object.entries(err.data).forEach(([key, value]) => {
      value.map((issue) => toastErr(`${key}: ${issue}`));
    });
    return;
  }

  if (err.status === 500) {
    toastErr('There was a problem connecting to the server.');
    return;
  }

  toastErr(`Error fetching team member: ${err}`);
}

export { decodeBackendError, isEmailValid, TEAM_API_URL };
