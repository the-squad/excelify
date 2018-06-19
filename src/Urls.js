const baseUrl = process.env.REACT_APP_API_HOST || '127.0.0.1:8000';

export default {
  history: `${baseUrl}/api/history`,
  parse: `${baseUrl}/api/parse`,
  login: `${baseUrl}/api/login`,
  signup: `${baseUrl}/api/register`,
};
