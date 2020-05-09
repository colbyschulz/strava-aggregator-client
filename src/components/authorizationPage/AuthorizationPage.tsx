import React, { FC } from 'react';
import { Wrapper } from './authorizationPage.css';
import { useLocation, useHistory } from 'react-router-dom';
import { api, API_URL, API_METHOD } from '../../api';

interface AuthBody {
  client_id: string;
  client_secret: string;
  grant_type: 'authorization_code' | 'refresh_token';
  code?: string;
}

const LoginPage: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);
  const authorizationCode = query.get('code');
  const refreshToken = localStorage.getItem('seltzerRefresh');
  const error = query.get('error');

  const handleAuthorization = async () => {
    const body: AuthBody = {
      client_id: '47529',
      client_secret: '4cf8af52d2012a93034d8bfff52d8258e14e105b',
      grant_type: authorizationCode ? 'authorization_code' : 'refresh_token',
    };

    body.code = authorizationCode || refreshToken;

    const response = await api(API_URL.authenticate, API_METHOD.POST, body);
    const { access_token, refresh_token, expires_at } = response;
    localStorage.setItem('seltzerAccess', access_token);
    localStorage.setItem('seltzerRefresh', refresh_token);
    localStorage.setItem('seltzerExpiration', expires_at);

    history.push('/');
  };

  React.useEffect(() => {
    handleAuthorization();
  }, []);

  return <Wrapper>{error}</Wrapper>;
};

export default LoginPage;
