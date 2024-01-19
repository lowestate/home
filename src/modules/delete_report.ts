import { ExtractionReports } from './ds'
import axios from 'axios';

export const deleteReport = async (userToken = '', request: ExtractionReports): Promise<string> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    },
  }
  return axios.delete(
    `/api/reports/${request.ID}/delete`,
  )
    .then((response) => response.data);
}