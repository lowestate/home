import { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { changeResourceStatus } from '../../modules/change_resource_status';
import "../../styles/resourceCard.style.css";
import { useNavigate } from 'react-router-dom';
import store, { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import cartSlice from '../../store/cartSlice';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { createReport } from '../../modules/create_report';
import { changeResource } from '../../modules/edit_resource';

interface Props {
    imageUrl: string;
    resourceName: string;
    resourceStatus: boolean;
    resourceDetailed: string;
    changeStatus: string;
    onStatusChange: (resourceName: string, newStatus: boolean) => void;
}

const ResCard: FC<Props> = ({ imageUrl, resourceName, resourceStatus, resourceDetailed, onStatusChange}) => {
    const [isStatusChanging, setIsStatusChanging] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { userRole, userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

    const handleStatusChange = async () => {
        setIsStatusChanging(true);
        try {
            await changeResourceStatus(userToken?.toString(), resourceName);
            onStatusChange(resourceName, !resourceStatus);
        } catch (error) {
            console.error('Ошибка при изменении статуса ресурса:', error);
        } finally {
            setIsStatusChanging(false);
            navigate('/resources');
        }
    };

    const handleResourceEdit = async () => {
        navigate(`/resources/${resourceName}/edit`)
    }

    const handleCreateReport = async () => {
        try {
            if(!userToken){
                return
            }
            const response = await createReport(resourceName, userToken);
            localStorage.setItem("reqID", response.data)
            dispatch(cartSlice.actions.addResource(resourceName));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    return (
        <Card className="card-container">
            <Card.Img className="card-image" src={imageUrl} />
            <Card.Body>
                <div>
                    <Card.Title className="card-title"> {resourceName} </Card.Title>
                    <Card.Title className="card-info">
                        Ресурс {resourceStatus ? "еще есть" : "закончился"}
                    </Card.Title>
                </div>
                <Button className="card-details-button" href={resourceDetailed}>
                    Отчет по добыче
                </Button>
                <div></div>
                    {userRole =='1' && (
                    <Button
                        className='button'
                        onClick={handleStatusChange}
                        disabled={isStatusChanging}
                    >
                        {isStatusChanging ? 'Удаление...' : 'Удалить'}
                    </Button>
                    ) && (
                        <Button
                        className='button'
                        onClick={handleResourceEdit}
                    >
                        Редактировать
                    </Button>
                    )}
                    {userRole =='0' && (
                        <Button className='button' onClick={handleCreateReport}> Добавить</Button>
                    )}
            </Card.Body>
        </Card>

    )
};


export default ResCard;
