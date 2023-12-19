import axios from 'axios';
import { ExtractionReports } from './ds';

export const getDetailedReport = async (userToken = '', req_id = ''): Promise<ExtractionReports> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
            'Accept': 'application/json'
        },
    };

    try {
        const response = await axios.get(`/api/reports/${encodeURIComponent(req_id)}`, config);
        const { data } = response;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Ошибка при выполени запроса:", error);
        throw error;
    }
};