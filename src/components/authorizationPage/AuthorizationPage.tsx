import React, { FC } from 'react';
import { Wrapper } from './authorizationPage.css';
import { useHistory } from 'react-router-dom';
import { handleAuthorization } from '../../utils';
import { navigation } from '../../navigation';

const AuthorizationPage: FC = () => {
  const history = useHistory();
  const query = new URLSearchParams(location.search);
  const authorizationCode = query.get('code');
  const error = query.get('error');

  const auth = async () => {
    await handleAuthorization(authorizationCode);
    history.push(navigation.dashboard);
  };

  React.useEffect(() => {
    auth();
  }, []);

  return <Wrapper>{error}</Wrapper>;
};

export default AuthorizationPage;
