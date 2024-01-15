import axios from "axios";

export const InsertPlanInMM = async (userToken: string | null, reportRef:  number | null, resourceRef: string | null, resPlan: number | null): Promise<string> => {
    console.log(reportRef, resourceRef, resPlan)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
    return axios.put(
      '/api/manage_reports/add_plan',
      {
        report_ref: reportRef,
        resource_ref: resourceRef,
        plan: resPlan
      },
      config
  
    )
      .then((response) => response.data);
  }