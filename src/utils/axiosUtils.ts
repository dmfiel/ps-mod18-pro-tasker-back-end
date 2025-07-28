import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

export const getAxios = async (
  req: Request,
  res: Response,
  client: AxiosInstance,
  url: string,
  message404: string,
  message502: string
): Promise<AxiosResponse> => {
  try {
    let resAxios: AxiosResponse;
    if (client) resAxios = await client.get(url);
    else resAxios = await axios.get(url);

    console.log('getAxios ', url, resAxios.status);

    // If the response status is 404, we send our own 404 response.
    if (resAxios.status === 404) {
      res.status(404).json({ message: message404 });
      return;
    }

    // Handle other non-successful responses that aren't 404
    // if (!resAxios.ok) {
    if (!responseOK(resAxios)) {
      // This will catch 500s from the external API, etc.
      res.status(502).json({ message: message502 });
      return;
    }
    res.status(200);
    return resAxios;
  } catch (error) {
    console.error('API request failed:', error.message);
    // We can use a 502 Bad Gateway status to indicate that our server
    // received an invalid response from the upstream server.
    res
      .status(502)
      .json({ message: 'Failed to get a valid response from the API.' });
  }
};

export function responseOK(response: AxiosResponse): boolean {
  return (
    response &&
    response.status >= 200 &&
    response.status <= 299 &&
    (response.statusText === 'OK' || response.statusText === '')
  );
}
