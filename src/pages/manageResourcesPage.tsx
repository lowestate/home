import { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Form, Button, Col, FormControl, ListGroup, ListGroupItem, Modal, Row } from "react-bootstrap";
import cartSlice from "../store/cartSlice";
import store, { useAppDispatch } from "../store/store";
import { createReport } from "../modules/create_report";
import { useNavigate } from "react-router-dom";
import { deleteResourceFromMM } from "../modules/delete_resource_from_mm";
import { changeReportStatus } from "../modules/change_report_status";
import { changeResourceStatus } from "../modules/change_resource_status";
import { InsertPlanInMM } from "../modules/insert_plan_in_mm";
import { InsertDataToReport } from "../modules/insertDataInReport";

const ManageResources: FC = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
    const [inputPlace, setInputPlace] = useState< string >();
    const [inputMonth, setInputMonth] = useState< string >();

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    const resources = useSelector((state: ReturnType<typeof store.getState>) => state.cart.resources);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const deleteFromCart = (orbitName: string) => {
        return async (event: React.MouseEvent) => {
            if (!userToken) {
                return;
            }
            try {
                console.log(orbitName, localStorage.getItem("reqID"))
                await deleteResourceFromMM(orbitName, localStorage.getItem("reqID"), userToken);
                dispatch(cartSlice.actions.removeResource(orbitName));
            } catch (error) {
                console.error(error);
                setShowError(true);
            }
            event.preventDefault();
        };
    };

    const sendPlansToBackend = async () => {
        if (!userToken) {
            return;
        }
        
        const reqIDString: string | null = localStorage.getItem("reqID");
        const reqID: number = reqIDString ? parseInt(reqIDString, 10) : 0;
        

        try {
            const resourcesFromLS = localStorage.getItem("resources")
            const resourcesArray = resourcesFromLS ? resourcesFromLS.split(',') : [];

            if (inputValues && inputMonth && inputPlace) { 
                await Promise.all(
                    resourcesArray.map(async (resName, resID) => {
                        const plan = inputValues[resID] || ''; 
                        await InsertPlanInMM(userToken, reqID, resName, parseInt(plan, 10));
                    })
                );
                await InsertDataToReport(userToken, reqID, inputMonth, inputPlace);
                
                await changeReportStatus(userToken, {
                    ID: reqID,
                    Status: "На рассмотрении",
                });
    
                localStorage.setItem("reqID", "");
    
                const storedOrbitsString: string[] | undefined = localStorage.getItem('resources')?.split(',');
                if (storedOrbitsString) {
                    storedOrbitsString.forEach((orbitName: string) => {
                        dispatch(cartSlice.actions.removeResource(orbitName));
                    });
    
                    localStorage.setItem("resources", "");
                }
                setRedirectUrl(`/reports/`);
                setShowSuccess(true);
            }
        } catch (error) {
            console.error(error);
            setShowError(true);
        }
    };

    const deleteRequest = async () => {
        if (!userToken) {
            return;
        }

        const reqIDString: string | null = localStorage.getItem("reqID");
        const reqID: number = reqIDString ? parseInt(reqIDString, 10) : 0;

        try {
            await changeReportStatus(userToken, {
                ID: reqID,
                Status: "Удалена",
            });

            localStorage.setItem("reqID", "");

            const storedOrbitsString: string[] | undefined = localStorage.getItem('resources')?.split(',');
            if (storedOrbitsString) {
                storedOrbitsString.forEach((orbitName: string) => {
                    dispatch(cartSlice.actions.removeResource(orbitName));
                });

                localStorage.setItem("resources", "");
            }
            navigate(`/resources`);
        } catch (error) {
            console.error(error);
            setShowError(true);
        }
    };

    const handleErrorClose = () => {
        setShowError(false);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);

        if (redirectUrl) {
            navigate(redirectUrl);
            setRedirectUrl(null);
        }
    };

    const handleResourceInputChange = (e: ChangeEvent<HTMLInputElement>, resID: number) => {
        const inputValue = e.target.value;
        setInputValues((prevValues) => ({ ...prevValues, [resID]: inputValue }));
    };

    const handlePlaceInput = (e: ChangeEvent<HTMLSelectElement>) => {
        const inputPlace = e.target.value;
        setInputPlace(inputPlace);
    };

    const handleMonthInput = (e: ChangeEvent<HTMLSelectElement>) => {
        const inputMonth = e.target.value;
        setInputMonth(inputMonth);
    };

    return (
        <div className="cart-container">
            <Modal show={showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Не получилось добавить ресурс</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Заявка отправлена</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                        Просмотр
                    </Button>
                    <Button onClick={() => navigate(`/resources`)} variant="primary" className="button">
                        К ресурсам
                    </Button>
                </Modal.Footer>
            </Modal>
    
            {!userToken && (
                <>
                    <h3> Вам необходимо войти в систему </h3>
                    <Button onClick={() => navigate(`/auth`)} variant="primary" className="button">
                        Войти
                    </Button>
                </>
            )}
            {userToken && (
                <>
                    {resources?.length !== 0 && <h3 style={{ color: '#fff', marginLeft: '10px' }}>Выбранные ресурсы:</h3>}
                    {resources?.length === 0 && (
                        <h4 style={{ color: '#fff', marginLeft: '10px' }}>Вы ещё не выбрали ни одного ресурса</h4>
                    )}
                    <ListGroup style={{ width: '500px', margin: '0 auto' }}>
                        {resources?.map((resName, resID) => (
                            <ListGroupItem key={resID} style={{ textAlign: 'left' }}>
                                {resName}
                                <FormControl
                                    style={{ width: '35%' }}
                                    type="text"
                                    placeholder="Добыча по плану..."
                                    value={inputValues[resID] || ''}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleResourceInputChange(e, resID)}
                                />
                                <span style={{ float: 'right' }}>
                                    <Button variant="danger" onClick={() => deleteFromCart(resName)}>
                                        Удалить
                                    </Button>
                                </span>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    {resources?.length !== 0 && (
                        <>
                            <Row style={{ margin: '20px auto', textAlign: 'center', width: '41%' }}>
                                <Col>
                                    <Form.Select
                                        value={inputPlace || ''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePlaceInput(e)}
                                    >
                                        <option value="">Выберите место добычи</option>
                                        <option value="Море Восточное">Море Восточное</option>
                                        <option value="Море Влажности">Море Влажности</option>
                                        <option value="Океан Бурь">Океан Бурь</option>
                                    </Form.Select>
                                </Col>
    
                                <Col>
                                    <Form.Select
                                        value={inputMonth || ''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleMonthInput(e)}
                                    >
                                        <option value="">Выберите месяц</option>
                                        <option value="Январь">Январь</option>
                                        <option value="Февраль">Февраль</option>
                                        <option value="Март">Март</option>
                                        <option value="Апрель">Апрель</option>
                                        <option value="Май">Май</option>
                                        <option value="Июнь">Июнь</option>
                                        <option value="Июль">Июль</option>
                                        <option value="Август">Август</option>
                                        <option value="Сентябрь">Сентябрь</option>
                                        <option value="Октябрь">Октябрь</option>
                                        <option value="Ноябрь">Ноябрь</option>
                                        <option value="Декабрь">Декабрь</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Col>
                                    <Button
                                        className="common-button"
                                        variant="success"
                                        onClick={sendPlansToBackend}
                                        disabled={resources.length === 0}

                                    >
                                        Сформировать
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        className="common-button"
                                        variant="danger"
                                        onClick={deleteRequest}
                                        disabled={resources.length === 0}
                                        style={{marginTop: '10px'}}
                                    >
                                        Отменить
                                    </Button>
                                </Col>
                            </div>
                        </>
                    )}
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => navigate("/resources")}
                            style={{
                                backgroundColor: '#001f3f',
                                color: '#fff',
                                borderRadius: '8px',
                                border: '1px solid',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                marginTop: '10px', // Добавленный отступ сверху
                            }}
                        >
                            К ресурсам
                        </button>
                    </div>
                </>
            )}
        </div>
    );
    
};              

export default ManageResources;
