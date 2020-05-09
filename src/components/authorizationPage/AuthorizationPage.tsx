import React, { FC } from 'react';
import { Wrapper } from './authorizationPage.css';
import { useLocation, useHistory } from 'react-router-dom';
import { api, API_URL, API_METHOD } from '../../api';

const LoginPage: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);
  const authorizationCode = query.get('code');
  const error = query.get('error');

  const handleAuthorization = async (authCode: string) => {
    const body = {
      client_id: '47529',
      client_secret: '4cf8af52d2012a93034d8bfff52d8258e14e105b',
      code: authCode,
      grant_type: 'authorization_code',
    };

    const response = await api(API_URL.authenticate, API_METHOD.POST, body);

    const accessToken = response.access_token;
    const refreshToken = response.refresh_token;
    localStorage.setItem('seltzerAccess', accessToken);
    localStorage.setItem('seltzerRefresh', refreshToken);

    history.push('/');
  };

  React.useEffect(() => {
    if (authorizationCode) {
      handleAuthorization(authorizationCode);
    }
  }, [authorizationCode]);

  return <Wrapper>{error}</Wrapper>;
};

export default LoginPage;
