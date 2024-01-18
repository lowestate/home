import { Resource } from "./ds"

import axios from "axios"

export const getReportResources = async(request_id = 0, userToken = ''): Promise<Resource[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        '/api/manage_reports/' +  String(request_id),
        config)
        .then((response) => {
            const {data} = response

            return data;
        })
}