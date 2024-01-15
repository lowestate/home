import { getReports } from "./get_all_reports";
import { getReportResources } from "./get_report_resources";

const loadReport = async (userToken: string | undefined, userRole: string | undefined, userName: string | undefined) => {
  if (userToken && userToken !== '') {
    const result = (await getReports(userToken, userName, 'Черновик')).filter((item) => {
      if (userRole === '0') {
        return item.Client?.Username === userName;
      } else {
        return [];
      }
    });

    if (result[0]?.ID) {
      const orbitsData = await getReportResources(result[0].ID, userToken);
      return orbitsData;
    }
  }

  return [];
}

export default loadReport;