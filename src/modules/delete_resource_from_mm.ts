import axios, { AxiosResponse } from "axios";

export const deleteResourceFromMM = async(resource: string, req: string | null, userToken: string): Promise<AxiosResponse> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
    };

    return axios.delete(
        `/api/manage_reports/delete_single`,
        {
            headers: config.headers,
            data: {
                resource: resource,
                req: req
            },
        }
    )
    .then((response) => response);
}