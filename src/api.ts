import { handleAuthorization } from './utils';

export const API_URL = {
  authenticate: 'https://www.strava.com/oauth/token',
  athlete: 'https://www.strava.com/api/v3/athlete',
  getClubs: 'https://www.strava.com/api/v3/athlete/clubs',
  getClub: (id: string) => `https://www.strava.com/api/v3/clubs/${id}`,
  getClubActivities: (id: string) => `https://www.strava.com/api/v3/clubs/${id}/activities`,
};

export enum API_METHOD {
  GET = 'GET',
  POST = 'POST',
}

export const hasValidToken = () => {
  const accessToken = localStorage.getItem('seltzerAccess');
  const tokenExpiration = parseInt(localStorage.getItem('seltzerExpiration'));
  const now = new Date();
  const secondsSinceEpoch = Math.round(now.getTime() / 1000);
  const tokenIsExpired = secondsSinceEpoch > tokenExpiration;

  return Boolean(accessToken && !tokenIsExpired);
};

export const api = async (url: string, method: API_METHOD, body?: {}, callback?: () => void) => {
  const accessToken = localStorage.getItem('seltzerAccess');
  const refreshToken = localStorage.getItem('seltzerRefresh');

  // handle auth
  if (!hasValidToken() && url !== API_URL.authenticate) {
    if (refreshToken) {
      await handleAuthorization(null, refreshToken);
    } else {
      window.location.assign(
        'http://www.strava.com/oauth/authorize?client_id=47529&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=read',
      );
      return;
    }
  }

  const requestBody: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (accessToken) {
    requestBody.headers = {
      ...requestBody.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  if (method === API_METHOD.POST) {
    requestBody.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestBody);
  const responseBody = await response.json();
  return responseBody;
};
