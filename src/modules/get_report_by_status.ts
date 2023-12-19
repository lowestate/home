import { getReports } from "./get_all_reports";

const getReportByStatus = async (
    userToken: string | undefined, 
    userRole: string | undefined,
    userName: string | null, 
    status: string) => {
    if (userToken && userToken !== '') {
        const result = (await getReports(userToken, status)).filter((item) => {
            if (userRole === '1') {
                return item.Client?.Username === userName;
            } else {
                return item.Moderator?.Username === userName;
            }
        });
        return result;
    }
}

export default getReportByStatus;