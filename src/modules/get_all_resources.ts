import axios from 'axios';
import { Resource } from './ds';

export const getAllResources = async (resName = ''  ): Promise<Resource[]> => {
  try {
    const response = await axios.get('/api/resources', {
      params: {
        title: resName,
      }
    });

    console.log("get-all-resources");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
