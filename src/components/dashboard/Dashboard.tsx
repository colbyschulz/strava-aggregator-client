import React, { FC } from 'react';

import { Wrapper } from './Dashboard.css';
import { useParams } from 'react-router-dom';

const Dashboard: FC = () => {
  const params = useParams();
  console.log(params);

  React.useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <Wrapper>
      Dashboard
      <a href="http://www.strava.com/oauth/authorize?client_id=47529&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=read">
        Authorize
      </a>
    </Wrapper>
  );
};

export default Dashboard;
