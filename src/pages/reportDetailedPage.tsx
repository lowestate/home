import { FC,  useState, useEffect } from "react";
import {  Button, FormGroup, Col, Modal, Row,  Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import store from "../store/store";
import { ExtractionReports, Resource } from "../modules/ds";
import { getReportResources } from "../modules/get_report_resources";
import { getDetailedReport } from "../modules/get_detailed_report";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getAllResources } from "../modules/get_all_resources";
import { getExtractionData } from "../modules/get_extraction_data";
import { changeReportStatusAdmin } from "../modules/change_report_status_admin";
import { changeReportStatusUser } from "../modules/change_report_status_user";


const styles = {
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px', 
    },
    reports: {
        backgroundColor: '#115e00',
        border: '1px solid #2bed00',
        margin: '0 5px',
    },
    resources: {
        backgroundColor: '#001f3f',
        color: '#fff',
        margin: '0 5px', 
    },
};

const ReportDetailedPage: FC = () => {
  const [, setResourceNames] = useState<string[]>();
  const [resources, setResources] = useState<Resource[]>();
  const [extractions, setExtraction] = useState<number[][] | undefined>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { userToken, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
  const [reqID, setReqId] = useState(0);
  const [req, setReq] = useState<ExtractionReports | undefined>();
  const [, setOptions] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        console.log("ERROR userToken null");
        return;
      }

      const resources = await getReportResources(+reqIdString, userToken);
      setResources(resources);
      const extractions = await getExtractionData(+reqIdString, userToken);
      console.log("---", extractions);
      setExtraction(extractions);
      var resNames: string[] = [];
      if (resources) {
        for (let resource of resources) {
          resNames.push(resource.ResourceName);
        }
        setResourceNames(resNames);
      }
    };

    const fetchOrbits = async () => {
      const resources = await getAllResources();
      setOptions(resources);
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
    if (req?.Status !== 'Черновик') {
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

    if (req?.ID === undefined) {
      console.log("ERROR req.ID undef");
      return;
    }
    if (userRole === '1') {
      await changeReportStatusAdmin(userToken, {
        ID: reqID,
        Status: status,
    });
    } else if (userRole === '0') {
      await changeReportStatusUser(userToken, {
        ID: reqID,
        Status: status,
    });
    }
    

    navigate("/reports/");
  };

  return (
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
      <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}>Состав заявки:</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Table bordered striped style={{ width: '600px', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '30%', textAlign: 'center' }}>Название ресурса</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Картинка</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Добыча по плану</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Добыто по факту</th>
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
                  <td style={{ textAlign: 'center', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {resource.ResourceName}
                  </td>
                  <td style={{ textAlign: 'center', height: '40px', position: 'relative', overflow: 'hidden' }}>
                    {extractions && (
                      <img
                        src={resource?.Image}
                        alt={resource.ResourceName}
                        style={{
                            width: '50px',
                            height: '40px',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: 'center', height: '40px' }}>{extraction_data ? extraction_data[1] : '-'}</td>
                  <td style={{ textAlign: 'center', height: '40px' }}>{extraction_data ? extraction_data[2] : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Form>
        <FormGroup className="form-group">
          {userRole === '1' && req?.Status === 'Сформирована' && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button className="common-button" variant="warning" onClick={() => sendChanges('Отклонена')}>Отклонить</Button>
              <Button className="common-button" variant="success" onClick={() => sendChanges('Одобрена')}>Одобрить</Button>
            </div>
          )}
        </FormGroup>
      </Form>
      <Row>
        <Col style={styles.buttonContainer}>
            <Button onClick={() => navigate(`/reports/`)} style={styles.reports}>
            Заявки
            </Button>
            <Button onClick={() => navigate(`/resources/`)} style={styles.resources}>
            Ресурсы
            </Button>
        </Col>
        </Row>
    </div>
  );
};

export default ReportDetailedPage;
