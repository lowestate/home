import { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux";
import store from "../store/store";
import { Button, FormControl, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNewRes } from "../modules/add_new_resource";

const NewResPage: FC = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputDensity, setInputDensity] = useState('');
    const [inputDemand, setInputDemand] = useState('');
    const [inputIsToxic, setInputIsToxic] = useState('');
    const [inputImage, setInputImage] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const navigate = useNavigate()

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

    const convertToBoolean = (value: string | undefined): boolean | undefined => {
        return value?.toLowerCase() === 'да';
    };

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();
        
        if (!userToken) {
            return;
        }
    
        try {
            await addNewRes(
                userToken,
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
        <div style={{marginLeft:'15px'}}>
          <h1 style={{color: "white"}}>Создание нового ресурса</h1>
          <FormControl
                type="text"
                placeholder="Название ресурса"
                value={inputName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />
    
            <FormControl
                type="text"
                placeholder="Плотность"
                value={inputDensity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDensityInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />

            <FormControl
                type="text"
                placeholder="Токсичен ли?"
                value={inputIsToxic}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleIsToxicInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />

            <FormControl
                type="text"
                placeholder="Спрос по 10-бальной шкале"
                value={inputDemand}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDemandInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />

            <FormControl
                type="text"
                placeholder="Описание"
                value={inputDesc}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDescInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />

            <FormControl
                type="text"
                placeholder="Картинка"
                value={inputImage || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageInput(e)}
                className="mr-sm-2"
                style={{width:'30%', marginBottom:'10px'}}
            />
            
            <Button className="common-button" 
                variant="success" 
                onClick={handleSubmit}>
                Добавить
            </Button>
    
          {showSuccess && <Alert variant="success">Resource added successfully!</Alert>}
          {showError && <Alert variant="danger">Error adding resource. Please try again.</Alert>}
        </div>
      );
}

export default NewResPage;

