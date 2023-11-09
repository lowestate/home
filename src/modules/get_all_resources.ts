import { Resource } from './ds';

export const getAllResources = async (resName = '') : Promise<Resource[]> => {
    return fetch('/api/home?title=' + String(resName))
        .then((response) => {
            console.log("get-all-resources");
            return response.json()
            .catch(() => ({ resultCount: 0, results:[]}));
        })
}