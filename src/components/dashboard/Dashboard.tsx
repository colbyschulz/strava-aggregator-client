import React, { FC, useEffect, useState } from 'react';

import { Wrapper } from './Dashboard.css';
import { api, API_URL, API_METHOD } from '../../api';

const Dashboard: FC = () => {
  const [athlete, setAthlete] = useState<Athlete>({});
  const fetchAthlete = async () => {
    const athlete = await api(API_URL.athlete, API_METHOD.GET);
    setAthlete(athlete);
  };

  useEffect(() => {
    fetchAthlete();
  }, []);

  return <Wrapper>Hi {athlete?.firstname}</Wrapper>;
};

export default Dashboard;
