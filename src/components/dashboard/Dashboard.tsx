import React, { FC, useEffect, useState } from 'react';

import { Wrapper, CoverPhoto } from './Dashboard.css';
import { api, API_URL, API_METHOD } from '../../api';

const Dashboard: FC = () => {
  const [athlete, setAthlete] = useState<Athlete>({});
  const [club, setClub] = useState<any>({});
  const [clubActivities, setClubActivities] = useState<any>({});

  const fetchData = async () => {
    const athlete = await api(API_URL.athlete, API_METHOD.GET);
    const clubResp = await api(API_URL.getClub('43749'), API_METHOD.GET);
    const clubActivitiesResp = await api(API_URL.getClubActivities('43749'), API_METHOD.GET);
    console.log(clubResp);
    console.log(clubActivitiesResp);

    setAthlete(athlete);
    setClub(clubResp);
    setClubActivities(clubActivitiesResp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <div>Hi {athlete?.firstname}</div>
      <div>{club.name}</div>
      <CoverPhoto src={club.cover_photo} />
    </Wrapper>
  );
};

export default Dashboard;
