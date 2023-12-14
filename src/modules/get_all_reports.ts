import axios from 'axios'

import {ExtractionReports} from './ds'

export const getReports = async (userToken = '', status = ''): Promise<ExtractionReports[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        `/api/reports` + status,
        config,
    )
    .then((response) => {
        const { data } = response
        console.log(data)
        return data;
    }) 

}