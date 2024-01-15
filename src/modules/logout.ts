import axios from 'axios';

const logoutUser = async () => {
  try {
    // Получаем значение cookie и удаляем "orbits-api-token=Bearer+" из начала строки
    const cookieValue = document.cookie.replace(/resources-api-token=Bearer\+/g, '');
    console.log("C: ", cookieValue)

    const response = await axios.post('/api/logout', null, {
      headers: {
        Authorization: `Bearer ${cookieValue}`
      }
    });
    if (response) {
      console.log('Успешный выход из системы');
    }
    window.location.href = '/login';
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
  }
};

export default logoutUser;