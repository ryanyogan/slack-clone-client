import decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('@slack-token');
  const refreshToken = localStorage.getItem('@slack-refresh-token');

  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }

  return true;
};
