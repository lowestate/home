import axios, { AxiosResponse } from "axios";

export const createReport = async(resource: string, userToken: string): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
      `/api/resources/${encodeURIComponent(resource)}/add`,
      {
        'resources': resource,
      },
      config

  )
  .then((response) => response);
}