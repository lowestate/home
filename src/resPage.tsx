import { FC, useEffect, useState } from 'react'
import './styles/hp-style.css'
import { useParams } from 'react-router-dom';
import { getResourceByName } from './modules/get_resource_by_name'
import { Resource } from './modules/ds'
import NavigationMain from './components/NavBar';
import Breadcrumbs from './components/Breadcrumbs';

const ResPage: FC = () => {
    const [resource, setResource] = useState<Resource>()

    const { title } = useParams();

    useEffect(() => {
        console.log("res_name: ", title)

        const loadResource = async () => {
            const result = await getResourceByName(String(title))
            setResource(result)
        }

        loadResource()
    }, [title]);

  return (  
    <div>
      <NavigationMain/>
      <Breadcrumbs/>
      <div className="resource-body">
        <div className="resource-container">
            {resource ? (
              <div className="resource-details">
                <img src={`data:image/jpg;base64, ${resource.Image}`} className="resource-image" alt="картинка" />
                <h1 className="resource-title">{resource.ResourceName}</h1>
                <p className="resource-info">Место добычи: {resource.Place}</p>
                <p className="resource-info">Статус: {resource.IsAvailable ? 'еще есть' : 'закончился'}</p>
                <a href="../home" className="home-link">
                  <span className="home-button">На главную страницу</span>
                </a>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
  )
}

export default ResPage