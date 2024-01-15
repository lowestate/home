import { FC, useEffect, useState } from 'react'
import '../styles/rp-style.css'
import { useParams } from 'react-router-dom';
import { getResourceByName } from '../modules/get_resource_by_name'
import { Resource } from '../modules/ds'

const ResPage: FC = () => {
    const [resource, setResource] = useState<Resource>()

    const { resource_name } = useParams();
    // const pathname = window.location.pathname
    useEffect(() => {
          console.log("res_name: ", resource_name)

          const loadResource = async () => {
              const result = await getResourceByName(String(resource_name))
              console.log(result)
              setResource(result)
          }
  
          loadResource()
        
    }, [resource_name]);

    return (  
      <div className="resource-body">
        <div className="resource-container">
          {resource ? (
            <><div className="resource-details">
              <img src={resource?.Image} className="resource-image" alt="картинка" />
              <div className="info">
                <h1 className="resource-title">{resource.ResourceName}</h1>
                <p className="resource-info">Этот ресурс {resource.IsAvailable ? 'еще есть' : 'закончился'}</p>
                <p className="resource-info">Плотность: {resource.Density}</p>
                <p className="resource-info">Токсичность: {resource.IsToxic ? 'да' : 'нет'}</p>
                <p className="resource-info">Спрос (по 10-ти бальной шкале): {resource.Demand}</p>
              </div>
            </div>
            <p className="resource-info">
              Описание: {resource.Desc}
            </p>
            <a href="../resources" className="home-link">
              <span className="home-button">На главную страницу</span>
            </a>
            </>
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </div>
    );
    
}

export default ResPage