import axios from 'axios';
import { ExtractionReports } from './ds';

export const getReports = async (userToken = '', userName = '', status = '', dateStart = '', dateEnd = ''): Promise<ExtractionReports[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    };

    const queryParams = new URLSearchParams({
        username: userName,
        status: status,
        date_start: dateStart,
        date_end: dateEnd
    });

    return axios.get(`/api/reports?${queryParams.toString()}`, config)
        .then((response) => {
            const { data } = response;
            return data;
        });
};