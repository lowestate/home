import { getReports } from "./get_all_reports";

const getReportByStatus = async (
    userToken: string | undefined, 
    userRole: string | undefined,
    userName: string | undefined, 
    status: string
) => {
    if (userToken && userToken !== '' && userRole) {
        const reports = await getReports(userToken, userName, status);
        console.log('r',reports)

        if (!Array.isArray(reports)) {
            console.error("Invalid data structure returned by getReports:", reports);
            return null; // or return an empty array or handle the error accordingly
        }
        /*
        const result = reports.filter((item) => {
            if (userRole === '1') {
                return item.Client?.Username === userName;
            } else {
                return item.Moderator?.Username === userName;
            }
        });*/

        return reports;
    }

    return null; // or handle the case where userToken is null or empty
}

export default getReportByStatus;
