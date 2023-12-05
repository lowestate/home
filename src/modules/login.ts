import axios from "axios";

export const loginUser = async (data: { username: string, password: string }): Promise<void> => {
    try {
      const response = await axios.post('/api/login', data);
      if (response.status === 200) {
        window.location.href = '/resources';
      } else {
        throw new Error('Ошибка при аутентификации');
      }
    } catch (error) {
      throw new Error('Ошибка при аутентификации');
    }
  };
  
  