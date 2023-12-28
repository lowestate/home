import axios from "axios"

export const getExtractionData = async(request_id = 0, userToken = ''): Promise<number[][]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        '/api/manage_reports/' +  String(request_id) + '/extraction',
        config)
        .then((response) => {
            const {data} = response

            return data;
        })
}