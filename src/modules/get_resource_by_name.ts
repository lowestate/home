import {Resource} from './ds'

export const getResourceByName = async  (resourceName = ''): Promise<Resource> => {
    return fetch('/api/home/' + String(resourceName),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}