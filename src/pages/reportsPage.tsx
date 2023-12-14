import { FC, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TransfReqCard from "../components/reportCard/reportCard";
import store from "../store/store";
import { ExtractionReports } from "../modules/ds";
import { getReports } from "../modules/get_all_reports";

const ReportCard: FC = () => {
    const {userToken, userRole, userName} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [transfReqs, setTransfReqs] = useState<ExtractionReports[]>([])

    useEffect(() => {
        const loadTransfReqs = async()  => {
            if (userToken !== undefined) {
                const result = (await getReports(userToken?.toString(), '')).filter((item) => {
                    if (userRole === '0') {
                        return item.Client?.Username === userName;
                    } else {
                        console.log(userName)
                        return item.Moderator?.Username === userName;
                    }
                  });
                setTransfReqs(result)
            }
        }

        loadTransfReqs()

    }, []);

    return (
        <>
            {!userToken &&
                <h3> Вам необходимо войти в систему! </h3>

            }
            {userToken && transfReqs.length == 0 &&
                <h3> Заявки не найдены</h3>
            }
            <Row xs={4} md={4} className='g-4' >
                {transfReqs.map((item, index) => (
                    <Col key={index}> 
                        <TransfReqCard {...{
                            status: item.Status,
                            dateCreated: item.DateCreated,
                            dateFinished: item.DateFinished,
                        }}></TransfReqCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ReportCard