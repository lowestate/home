import axios from "axios";

export const InsertDataToReport = async (userToken: string | null, reportRef:  number | null, rep_month: string, rep_place: string): Promise<string> => {
    console.log(reportRef, rep_month, rep_place)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
    return axios.put(
      `/api/reports/${reportRef}/add_data`,
      {
        month: rep_month,
        place: rep_place
      },
      config
  
    )
      .then((response) => response.data);
  }