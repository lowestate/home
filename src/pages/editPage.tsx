import { ChangeEvent, FC, useState } from "react";
import { deleteResourceFromMM } from "../modules/delete_resource_from_mm";
import cartSlice from "../store/cartSlice";
import { useSelector } from "react-redux";
import store from "../store/store";
import { Resource } from "../modules/ds";
import { Modal, Button, ListGroup, ListGroupItem, FormControl, Row, Col, Alert } from "react-bootstrap";
import { Form, useNavigate, useParams } from "react-router-dom";
import { addNewRes } from "../modules/add_new_resource";
import { changeResource } from "../modules/edit_resource";
import { getResourceByName } from "../modules/get_resource_by_name";

const EditPage: FC = () => {
    const [resource, setResource] = useState<Resource>();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputDensity, setInputDensity] = useState('');
    const [inputDemand, setInputDemand] = useState('');
    const [inputIsToxic, setInputIsToxic] = useState('');
    const [inputImage, setInputImage] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const navigate = useNavigate()
    
    const { resource_name } = useParams();
    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

    const convertToBoolean = (value: string | undefined): boolean | undefined => {
        return value?.toLowerCase() === 'да';
    };

    const fetchData = async () => {
        try {
            const result = await getResourceByName(resource_name);
            setResource(result)
        } catch (error) {
            console.error("Ошибка в получении ресурса", error);
        }
    };
    
    fetchData();

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();
        
        if (!userToken) {
            return;
        }
    
        try {
            await changeResource(
                userToken,
                resource_name,
                inputName,
                parseFloat(inputDensity ?? "0"),
                parseInt(inputDemand ?? "0", 10),
                convertToBoolean(inputIsToxic),
                inputImage,
                inputDesc
            );
                
            setShowSuccess(true);
            setInputName('');
            setInputDensity('');
            setInputDemand('');
            setInputIsToxic('');
            setInputImage('');
            setInputDesc('');

            navigate('/resources')
        } catch (error) {
            console.error(error);
            setShowError(true);
        }
    };

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.value;
        setInputName(inputName);
    };

    const handleDensityInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputDensity = e.target.value;
        setInputDensity(inputDensity);
    };

    const handleDemandInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputDemand = e.target.value;
        setInputDemand(inputDemand);
    };

    const handleIsToxicInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputIsToxic = e.target.value;
        setInputIsToxic(inputIsToxic);
    };

    const handleDescInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputDesc = e.target.value;
        setInputDesc(inputDesc);
    };

    const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputImage = e.target.value;
        setInputImage(inputImage);
    };

    return (
        <div style={{ marginLeft: '15px' }}>
          <h1 style={{ color: 'white' }}>Редактирование ресурса</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Название ресурса:</span>
              <FormControl
                type="text"
                placeholder={resource?.ResourceName}
                value={inputName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameInput(e)}
                className="mr-sm-2"
                style={{width: '500px'}}
              />
            </div>
      
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Плотность:</span>
              <FormControl
                type="text"
                placeholder={resource?.Density.toString()}
                value={inputDensity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDensityInput(e)}
                style={{width: '500px'}}
              />
            </div>
      
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Токсичен?</span>
              <FormControl
                type="text"
                placeholder={resource?.IsToxic ? 'Да' : 'Нет'}
                value={inputIsToxic}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleIsToxicInput(e)}
                className="mr-sm-2"
                style={{width: '500px'}}
              />
            </div>
      
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Спрос от 0 до 10:</span>
              <FormControl
                type="text"
                placeholder={resource?.Demand.toString()}
                value={inputDemand}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDemandInput(e)}
                className="mr-sm-2"
                style={{width: '500px'}}
              />
            </div>
      
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Описание:</span>
              <FormControl
                type="text"
                placeholder={resource?.Desc.toString()}
                value={inputDesc}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDescInput(e)}
                className="mr-sm-2"
                style={{width: '500px'}}
              />
            </div>
      
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '10px', color: 'white', fontSize: '18px', width: '200px' }}>Картинка:</span>
              <FormControl
                type="text"
                placeholder={resource?.Image}
                value={inputImage || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageInput(e)}
                className="mr-sm-2"
                style={{width: '500px'}}
              />
            </div>
          </div>
      
          <Button className="common-button" variant="success" onClick={handleSubmit}>
            Изменить
          </Button>
      
          {showSuccess && <Alert variant="success">Resource added successfully!</Alert>}
          {showError && <Alert variant="danger">Error adding resource. Please try again.</Alert>}
        </div>
      );
      
      
}

export default EditPage;

