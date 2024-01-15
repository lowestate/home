import axios, { AxiosResponse } from "axios";

export const setReportResources = async(report_id = 0, resource_names: string[], userToken='') : Promise<AxiosResponse> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.put(
        '/api/reports/set_resources',
        {
            report_id: report_id,
            resources: resource_names
        },
        config
    )
    .then((response) => response)
}