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
import { deleteResourceFromMM } from '../../modules/delete_resource_from_mm';

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
    const [isResourceAdded, setIsResourceAdded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { userRole, userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    const addedResources = localStorage.getItem("resources")

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
            if (!isResourceAdded) {
              const response = await createReport(resourceName, userToken);
              setIsResourceAdded(true)
              localStorage.setItem("reqID", response.data)
              dispatch(cartSlice.actions.addResource(resourceName));
            } else {
              console.log(resourceName, localStorage.getItem("reqID"))
              await deleteResourceFromMM(resourceName, localStorage.getItem("reqID"), userToken);
              setIsResourceAdded(false)
              dispatch(cartSlice.actions.removeResource(resourceName));
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    return (
        <Card style={{
          backgroundColor: 'rgba(54, 54, 54, 0.7)',
          borderRadius: '5px',
          border: '1px solid #fff',
          margin: '10px',
        }}>
          <Card.Img
            src={imageUrl}
            style={{
              maxWidth: 'calc(100% - 15px)',
              borderRadius: '5px',
              margin: '10px auto',
              height: '200px',
            }}
          />
          <Card.Body style={{ textAlign: 'center' }}>
            <div>
              <Card.Title
                style={{
                  fontSize: '30px',
                  fontWeight: '700',
                  color: '#f8f8f8',
                }}
              >
                {resourceName}
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  color: '#d6d6d6',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  padding: '10px',
                }}
              >
                Ресурс {resourceStatus ? 'еще есть' : 'закончился'}
              </Card.Title>
            </div>
            <Button
              href={resourceDetailed}
              style={{
                fontSize: '18px',
                backgroundColor: '#001f3f',
                color: '#fff',
                width: '90%',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '7px',
              }}
            >
              Отчет по добыче
            </Button>
            <div></div>
            {userRole === '1' && (
              <Button
                onClick={handleStatusChange}
                disabled={isStatusChanging}
                style={{
                  fontSize: '18px',
                  backgroundColor: '#800000',
                  color: '#fff',
                  border: '1px solid #FF0000',
                  width: '90%',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                {isStatusChanging ? 'Удаление...' : 'Удалить'}
              </Button>
            )}
            {userRole === '1' && (
              <Button
                onClick={handleResourceEdit}
                style={{
                  fontSize: '18px',
                  backgroundColor: '#945600', 
                  color: '#fff',
                  border: '1px solid #FFA500',
                  width: '90%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                }}
              >
                Редактировать
              </Button>
            )}
            {userRole === '0' && (
              <Button
                onClick={handleCreateReport}
                style={{
                  fontSize: '18px',
                  color: '#fff',
                  width: '90%',
                  padding: '10px',
                  borderRadius: '5px',
                  borderColor: '#fff',
                  backgroundColor: 'rgba(141, 27, 27, 0.7)',
                }}
              >
                {isResourceAdded ? 'Убрать' : 'Добавить'}
              </Button>
            )}
          </Card.Body>
        </Card>
      );
}      


export default ResCard;
