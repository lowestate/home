import axios from 'axios';

export const uploadImage = async (userToken = '', resourceName: string | undefined, image: File): Promise<string> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    },
  }
  return axios.put(
    `/api/resources/upload_image`,
    {
      resName: resourceName,
      image: image
    },
    config

  )
    .then((response) => response.data);
}