import axios from 'axios';
import { Resource } from './ds';

export const getAllResources = async (resName = '', resourcesWithHighDemand = '',): Promise<Resource[]> => {
  try {
    const queryParams = new URLSearchParams({
      resourceName: resName,
      highDemand: resourcesWithHighDemand,
    });

    const response = await axios.get(`/api/resources?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
