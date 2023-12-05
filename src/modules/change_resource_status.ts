import axios from 'axios';

export const changeResourceStatus = async (resource_name: string): Promise<void> => {
  try {
    const response = await axios.post(`api/resources/change_res_status/${resource_name}`);

    if (response.status === 200) {
      // Обработка успешного ответа
    } else {
      throw new Error('Ошибка при изменении статуса ресурса');
    }
  } catch (error) {
    throw new Error('Ошибка при изменении статуса ресурса');
  }
};
