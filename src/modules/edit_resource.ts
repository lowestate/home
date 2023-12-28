import axios from 'axios';
import { Resource } from './ds';

export const changeResource = async (userToken = '', resource_name: string | undefined, name: string | undefined, density: number | undefined, demand: number | undefined, isToxic: boolean | undefined, image: string | undefined, desc: string | undefined): Promise<string> => {
    const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    },
  }
  return axios.put(
    `/api/resources/${resource_name}/edit`,
    {
        'ResourceName': name,
	    'Density':      density,
	    'IsToxic':      isToxic,
	    'Demand':       demand,
	    'Image':        image,
	    'Desc':         desc,
    }

  )
    .then((response) => response.data);
}