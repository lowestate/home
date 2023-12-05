import { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { changeResourceStatus } from '../modules/change_resource_status';

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

    const handleStatusChange = () => {
        setIsStatusChanging(true); //рендер 1 => return (...)
        changeResourceStatus(resourceName)
            .then(() => {
                setIsStatusChanging(false); //рендер 2 (если успех) => return (...)
                onStatusChange(resourceName, !resourceStatus);
            })
            .catch((error) => {
                console.error('Ошибка при изменении статуса орбиты:', error);
                setIsStatusChanging(false); //рендер 2 (если не успех) => return (...)
            });
    };
    
    return (
        <Card className='resource-card'>
            <Card.Img className="resource-image" src={imageUrl}/>
            <Card.Body>
                <div>
                    <Card.Title className="resource-title"> {resourceName} </Card.Title>
                    <Card.Title className="resource-details"> Ресурс {resourceStatus ? "еще есть" : "закончился"} </Card.Title>
                </div>
                <Button className='home-button' href={resourceDetailed}> Отчет по добыче </Button>
                <div></div>
                <Button
                    className='delete-button'
                    onClick={handleStatusChange}
                    disabled={isStatusChanging}
                >
                    {isStatusChanging ? 'Изменение...' : 'Изменить статус'}
                </Button>
            </Card.Body>
        </Card>
    )
};


export default ResCard;
