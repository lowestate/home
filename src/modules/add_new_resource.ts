import axios, { AxiosResponse } from "axios";

export const addNewRes = async(userToken = '', name: string | undefined, density: number | undefined, demand: number | undefined, isToxic: boolean | undefined, image: string | undefined, desc: string | undefined): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
      `/api/resources/new_resource`,
      {
        'ResourceName': name,
	    'Density':      density,
	    'IsToxic':      isToxic,
	    'Demand':       demand,
	    'Image':        image,
	    'Desc':         desc,
      },
      config

  )
  .then((response) => response);
}