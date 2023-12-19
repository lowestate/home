import axios, {AxiosError} from 'axios';
import { ExtractionReports } from './ds';

export const getReports = async (userToken = '', status = '', dateStart = '', dateFin = ''): Promise<ExtractionReports[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    };

    const queryParams = new URLSearchParams({
        status: status,
        date_start: dateStart,
        date_fin: dateFin,
    });

    return axios.get(`/api/reports?${queryParams.toString()}`, config)
        .then((response) => {
            const { data } = response;
            return data;
        });
};