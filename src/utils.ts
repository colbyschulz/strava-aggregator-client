import { api, API_URL, API_METHOD } from './api';

interface AuthBody {
  client_id: string;
  client_secret: string;
  grant_type: 'authorization_code' | 'refresh_token';
  code?: string;
}

export const handleAuthorization = async (authCode: string, refreshToken?: string) => {
  const body: AuthBody = {
    client_id: '47529',
    client_secret: '4cf8af52d2012a93034d8bfff52d8258e14e105b',
    grant_type: authCode ? 'authorization_code' : 'refresh_token',
  };
  body.code = authCode || refreshToken;
  const response = await api(API_URL.authenticate, API_METHOD.POST, body);

  const { access_token, refresh_token, expires_at } = response;

  localStorage.setItem('seltzerAccess', access_token);
  localStorage.setItem('seltzerRefresh', refresh_token);
  localStorage.setItem('seltzerExpiration', expires_at);

  return response;
};
