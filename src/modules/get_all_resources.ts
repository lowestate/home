import axios from 'axios';
import { Resource } from './ds';

export const getAllResources = async (resName = '', resourceFromOcean = '', resourceFromVost = '', resourceFromVlazh = '',): Promise<Resource[]> => {
  try {
    const queryParams = new URLSearchParams({
      resourceName: resName,
      resourceFromOcean: resourceFromOcean,
      resourceFromVost: resourceFromVost,
      resourceFromVlazh: resourceFromVlazh,
    });

    const response = await axios.get(`/api/resources?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
