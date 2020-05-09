export enum API_URL {
  authenticate = 'https://www.strava.com/oauth/token',
  athlete = 'https://www.strava.com/api/v3/athlete',
}

export enum API_METHOD {
  GET = 'GET',
  POST = 'POST',
}

export const api = async (url: API_URL, method: API_METHOD, body?: {}, callback?: () => void) => {
  const accessToken = localStorage.getItem('seltzerAccess');
  const requestBody: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log('accessToken', accessToken);

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
  console.log('api response', response);

  const responseBody = await response.json();
  return responseBody;
};
