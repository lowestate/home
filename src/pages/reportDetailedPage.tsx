import { FC, useRef, useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button, FormGroup, FormSelect } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import store from "../store/store";
import { ExtractionReports } from "../modules/ds";
import { getReportResources } from "../modules/get_report_resources";
import { changeReportStatus } from "../modules/change_report_status";
import { setReportResources } from "../modules/set_report_resources";
import { getDetailedReport } from "../modules/get_detailed_report";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const ReportDetailedPage: FC = () => {
    const newOrbitInputRef = useRef<any>(null)

    const [orbitNames, setOrbitNames] = useState<string[]>()
    const [newOrbit, setNewOrbit] = useState('')
    const statusRef = useRef<any>(null)

    const { userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

    const [reqId, setReqId] = useState(0);
    const [req, setReq] = useState<ExtractionReports | undefined>();

    useEffect(() => {
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        const reqIdString = parts[parts.length - 1];
    
        if (reqIdString) {
            setReqId(+reqIdString);
        }
    
        const loadReq = async () => {
            try {
                const loadedReq = await getDetailedReport(userToken?.toString(), String(reqIdString));
                setReq(loadedReq);
            } catch (error) {
                console.error("Ошибка загрузки заявки:", error);
            }

            if (userToken === null) {
                return
            }

            const orbits = await getReportResources(+reqIdString, userToken)
            var orbitNames: string[] = []
            for (let orbit of orbits) {
                orbitNames.push(orbit.ResourceName)
            }
            setOrbitNames(orbitNames)

        }
    
        loadReq();
    }, [userToken]);

    const removeOrbit = (removedOrbitName: string) => {
        return (event: React.MouseEvent) => {
            if (!orbitNames) {
                return
            }

            setOrbitNames(orbitNames.filter(function(orbitName) {
                return orbitName !== removedOrbitName
            }))

            event.preventDefault()
        }
    }

    const addOrbit = () => {
        if (!orbitNames || !newOrbit) {
            return
        }

        setOrbitNames(orbitNames.concat([newOrbit]))
        setNewOrbit('')

        if (newOrbitInputRef.current != null) {
            newOrbitInputRef.current.value = ""
        }
    }

    const handleNewOrbitChange = (event: InputChangeInterface) => {
        setNewOrbit(event.target.value)
    }

    const sendChanges = async() => {
        if (!userToken) {
            return;
        }

        var req_id = 0
        var status = ''

        if (req?.ID !== undefined) {
            req_id = req?.ID
        }
        if (statusRef.current != null) {
            status = statusRef.current.value
        }

        const editResult = await changeReportStatus(userToken, {
            ID: req_id,
            Status: status,
        })
        console.log(editResult)


        if (!orbitNames || !userToken) {
            return;
        }
        const regionsResult = await setReportResources(req?.ID, orbitNames, userToken)
        console.log(regionsResult)

    }

    return(
        <>
        <h1>Редактирование отчеты по добыче #{reqId}</h1>
        <h4>Выбранные ресурсы:</h4>
        <ListGroup style={{width: '500px'}}>
            {orbitNames?.map((orbitName, orbitID) => (
                <ListGroupItem key={orbitID}> {orbitName}
                    <span className="pull-right button-group" style={{float: 'right'}}>
                        <Button variant="danger" onClick={removeOrbit(orbitName)}>Удалить</Button>
                    </span>
                </ListGroupItem>
            ))
            }
        </ListGroup>
        <span>
            <input ref={newOrbitInputRef} onChange={handleNewOrbitChange}></input>
            <Button onClick={addOrbit}>Добавить</Button>
        </span>
        <h4>Характеристики:</h4>
        <Form>
            <FormGroup>
                <label htmlFor="statusInput">Статус</label>
                <FormSelect id="statusInput" defaultValue={req?.Status} ref={statusRef}>
                    <option>Черновик</option>
                    <option>Удалена</option>
                    <option>На рассмотрении</option>
                    <option>Завершена</option>
                    <option>Отклонена</option>
                </FormSelect>
            </FormGroup>
        </Form>
        <Button onClick={sendChanges}> Сохранить изменения</Button>
        <p></p>
        <Button href='/reports'>К отчетам</Button>
        <p></p>
        <Button href='/resources'>К ресурсам</Button>
        <p></p>
        </>
    )

}

export default ReportDetailedPage;