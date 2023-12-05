import axios from 'axios';
import { Resource } from './ds';

export const getResourceByName = async (resourceName = ''): Promise<Resource> => {
  try {
    const response = await axios.get('/api/resources/' + String(resourceName),);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении ресурса');
  }
};
