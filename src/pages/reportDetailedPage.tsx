import { FC, useRef, useState, useEffect, ChangeEvent } from "react";
import { ListGroup, ListGroupItem, Button, FormGroup, FormSelect, Col, Modal, Row, FormControl, Table } from "react-bootstrap";
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
import { getExtractionData } from "../modules/get_extraction_data";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const ReportDetailedPage: FC = () => {
    const [resourceNames, setResourceNames] = useState<string[]>();
    const [resources, setResources] = useState<Resource[]>();
    const [extractions, setExtraction] = useState<number[][] | undefined>()
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
            setResources(orbits)
            const extractions = await getExtractionData(+reqIdString, userToken)
            console.log("---",extractions)
            setExtraction(extractions)
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

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) {
            return 'Не завершена';
        }

        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        const date = new Date(dateString);

        return new Intl.DateTimeFormat('ru-RU', options).format(date);
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

        navigate("/reports/")
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
            <Table bordered striped style={{ marginTop: '20px' }}>
                <tbody>
                    <tr>
                        <td><strong>Статус</strong></td>
                        <td><strong>Дата создания</strong></td>
                        <td><strong>Дата последнего изменения</strong></td>
                        <td><strong>Дата завершения</strong></td>
                        <td><strong>Место добычи</strong></td>
                        <td><strong>Месяц</strong></td>
                    </tr>
                    <tr>
                        <td>{req?.Status}</td>
                        <td>{formatDate(req?.DateCreated)}</td>
                        <td>{formatDate(req?.DateProcessed)}</td>
                        <td>{formatDate(req?.DateFinished)}</td>
                        <td>{req?.Place}</td>
                        <td>{req?.Month}</td>
                    </tr>
                </tbody>
            </Table>
            <h4>Состав заявки:</h4>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Table bordered striped style={{ width: '600px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>Название ресурса</th>
                            <th style={{ width: '40px' }}>Картинка</th>
                            <th style={{ width: '50px' }}>Добыча по плану</th>
                            <th style={{ width: '50px' }}>Добыто по факту</th>
                        </tr>
                    </thead>
                    <tbody>
                    {resources?.map((resource) => {
                        let extraction_data: number[] | undefined;

                        if (extractions) {
                            extraction_data = extractions.find((item) => item[0] === resource.ID);
                        }

                        return (
                            <tr key={resource.ID}>
                                <td style={{ width: '50px', height: '90px' }}>
                                    {resource.ResourceName}
                                </td>
                                <td style={{ width: '40px', height: '40px', position: 'relative' }}>
                                    {extractions && (
                                        <img
                                            src={resource?.Image}
                                            onError={(e) => { e.currentTarget.src = '/DEFAULT.jpg' }}
                                            style={{ width: '90%', height: '90%', position: 'absolute', right: '0' }}
                                        />
                                    )}
                                </td>
                                <td style={{ width: '50px' }}>{extraction_data ? extraction_data[1] : '-'}</td>
                                <td style={{ width: '50px' }}>{extraction_data ? extraction_data[2] : '-'}</td>
                            </tr>
                        );
                    })}

                        </tbody>
                </Table>
            </div>
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