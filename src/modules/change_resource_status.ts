export const changeResourceStatus = async (resource_name: string): Promise<void> => {
    try {
      const response = await fetch(`api/home/delete_resource/${resource_name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
      } else {
        throw new Error('Ошибка при изменении статуса ресурса');
      }
    } catch (error) {
      throw new Error('Ошибка при изменении статуса ресурса');
    }
  };
  