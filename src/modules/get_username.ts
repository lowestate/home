import axios from 'axios';

export const getUsernameByUUID = async (id = ''): Promise<string> => {
  try {
    const response = await axios.get('/api/users/' + String(id),);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении юзернейма');
  }
};
