import axios, { AxiosResponse } from "axios";

export const createReport = async(resources: string[], userToken: string): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
      '/api/reports/create',
      {
        'resources': resources,
      },
      config

  )
  .then((response) => response);
}