import { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { changeResourceStatus } from '../../modules/change_resource_status';
import "../../styles/resourceCard.style.css";
import { useNavigate } from 'react-router-dom';
import store, { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import cartSlice from '../../store/cartSlice';

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
    
    const handleAddResourceToCart = () => {
        dispatch(cartSlice.actions.addResources(resourceName))
    }

    const handleStatusChange = async () => {
        setIsStatusChanging(true);
        try {
            await changeResourceStatus(userToken?.toString(), resourceName);
            onStatusChange(resourceName, !resourceStatus);
        } catch (error) {
            console.error('Ошибка при изменении статуса орбиты:', error);
        } finally {
            setIsStatusChanging(false);
            navigate('/resources');
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
                    )}
                    {userRole =='0' && (
                        <Button className='button' onClick={handleAddResourceToCart}> Добавить</Button>
                    )}
            </Card.Body>
        </Card>

    )
};


export default ResCard;
