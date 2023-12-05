import axios from 'axios';

const logoutUser = async () => {
  try {
    const cookie = document.cookie.replace('Bearer ', ''); // Удаляем "Bearer " из значения cookie
    console.log(cookie)
    const response = await axios.post('/api/logout', null, {
      headers: {
        Authorization: `Bearer ${cookie}` // Добавляем обратно "Bearer " к значению cookie
      }
    });
    console.log('Успешный выход из системы');
    window.location.href = '/login';
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
  }
};

export default logoutUser;
