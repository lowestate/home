import { FC, useRef, useState, useEffect, ChangeEvent } from "react";
import { ListGroup, ListGroupItem, Button, FormGroup, FormSelect, Col, Modal, Row, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import store from "../store/store";
import { ExtractionReports, Resource } from "../modules/ds";
import { getReportResources } from "../modules/get_report_resources";
import { changeReportStatus } from "../modules/change_report_status";
import { setReportResources } from "../modules/set_report_resources";
import { getDetailedReport } from "../modules/get_detailed_report";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getAllResources } from "../modules/get_all_resources";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const ReportDetailedPage: FC = () => {
    const [resourceNames, setResourceNames] = useState<string[]>();
    const [resources, setResources] = useState<Resource[]>();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { userToken, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    const [reqId, setReqId] = useState(0);
    const [req, setReq] = useState<ExtractionReports | undefined>();
    const [options, setOptions] = useState<Resource[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    

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
                setError(null);
                setReq(loadedReq);
            } catch (error) {
                if ((error as AxiosError).message === '403') {
                    setError("403 Доступ запрещен");
                } else {
                    setError("500 Ошибка загрузки заявки");
                }
            }

            if (userToken === null) {
                console.log("ERROR userToken null")
                return;
            }

            const orbits = await getReportResources(+reqIdString, userToken);
            console.log(orbits)
            setResources(orbits)
            var orbitNames: string[] = [];
            if (orbits) {
                for (let orbit of orbits) {
                    orbitNames.push(orbit.ResourceName);
                }
                setResourceNames(orbitNames)
            }
        };

        const fetchOrbits = async () => {
            const orbits = await getAllResources();
            setOptions(orbits);
        };

        loadReq();
        fetchOrbits();
    }, [userToken]);

    if (error) {
        return (
            <div style={{ textAlign: 'center', fontSize: '2em', margin: 'auto' }}>
                {error}
            </div>
        );
    }

    const handleErrorClose = () => {
        setShowError(false);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        if (req?.Status != 'Черновик') {
            navigate('/resources/');
        }
    };

    

    const sendChanges = async (status: string) => {
        if (!userToken) {
            return;
        }

        if (req?.ID === undefined){
            console.log("ERROR req.ID undef")
            return
        }

        const editResult = await changeReportStatus(userToken, {
            ID: req?.ID,
            Status: status,
            Month: "",
            Place: ""
        });
    };

    return(
        <div className="container">
            <Modal show={showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Произошла ошибка, заявка не была обновлена</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Обновление заявки прошло успешно!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Отчет по добыче #{req?.ID}</h1>
            <p>Статус: {req?.Status}</p>
            <p>Место добычи: {req?.Place}</p>
            <p>Месяц: {req?.Month}</p>
            <h4>Ресурсы:</h4>
            <ListGroup className="list-group" style={{ width: '340px', height: '300px'}}>
                {resources?.map((resource) => (
                    <ListGroupItem key={resource.ID} className="list-group-item">
                        <div style={{ width: '150px', height: '15px' }}>
                            {resource.Image && (
                                <img
                                    src={resource?.Image}
                                    onError={(e) => { e.currentTarget.src = '/DEFAULT.jpg' }}
                                    style={{ width: '150px', height: '120px', position: 'absolute', right: '0' }}
                                />
                            )}
                        </div>
                        <div style={{ width: '150px', height: '100px' }}>
                            {resource.ResourceName}
                        </div>
                        
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Form>
                <FormGroup className="form-group">
                    {userRole === '1' && req?.Status === 'На рассмотрении' && (
                        <>
                            <div>
                                <Button className="common-button" variant="warning"
                                    onClick={() => sendChanges('Отклонена')}>Отклонить</Button>
                            </div>
                            <div>
                                <Button className="common-button" variant="success"
                                    onClick={() => sendChanges('Оказана')}>Одобрить</Button>
                            </div>
                        </>
                    )}
                </FormGroup>
            </Form>
            <Row>
                <Col>
                    <Button onClick={() => navigate(`/reports/`)}
                     className="button">
                        К заявкам
                    </Button>
                </Col>
                <Col>
                    <Button onClick={() => navigate(`/resources/`)}
                     className="button">
                        К ресурсам
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default ReportDetailedPage;