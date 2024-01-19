import { ExtractionReports } from './ds'
import axios from 'axios';

export const changeReportStatusAdmin = async (userToken = '', request: ExtractionReports): Promise<string> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken,
    },
  }
  return axios.put(
    '/api/reports/change_status_admin',
    {
      report_id: request.ID,
      status: request.Status,
    },
    config

  )
    .then((response) => response.data);
}