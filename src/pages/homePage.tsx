import { FC, useEffect, useState } from 'react';
import '../styles/hp-style.css';
import { Resource } from '../modules/ds';
import { getAllResources } from '../modules/get_all_resources';
import ResCard from '../components/resourceCard/ResCard';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import store, { useAppDispatch } from '../store/store';
import cartSlice from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getReportResources } from '../modules/get_report_resources';
import filtersSlice from '../store/filterSlice';
import ResourceFilter from '../components/resourceFilter/filter';
import getReportByStatus from '../modules/get_report_by_status';

const HomePage: FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { userToken, userRole, userName } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const { added } = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    const { resName } = useSelector((state: ReturnType<typeof store.getState>) => state.filters);
    const [name, setName] = useState(resName);

    const { resourceWithHighDemand } = useSelector((state: ReturnType<typeof store.getState>) => state.filters);
    const [highDemand, setHighRemand] = useState(resourceWithHighDemand);


    useEffect(() => {
        const loadDraftRequest = async () => {
          const result = (await getReportByStatus(userToken?.toString(), userRole, userName, 'Черновик'))
          if (!result) {
            return
          }
          if (result[0]?.ID) {
            localStorage.setItem("reqID", result[0].ID.toString());
            const orbitsData = await getReportResources(result[0].ID, userToken?.toString());
            var orbitNames: string[] = [];
            if (orbitsData) {
              for (let orbit of orbitsData) {
                orbitNames.push(orbit.ResourceName);
              }
              dispatch(cartSlice.actions.setResources(orbitNames));
            }
          };
        }
        loadDraftRequest()
    
    
        const loadOrbits = async () => {
          try {
            const result = await getAllResources(name?.toString(), resourceWithHighDemand?.toString());
            setResources(result);
          } catch (error) {
            console.error("Ошибка при загрузке объектов:", error);
          }
        }
    
        loadOrbits();
      }, []);
    

    const applyFilters = async () => {
        try {
        const data = await getAllResources(name?.toString(), resourceWithHighDemand?.toString());
        dispatch(filtersSlice.actions.setResourceName(name));
        dispatch(filtersSlice.actions.setResourcesWithHighDemand(highDemand));

        setResources(data);

        navigate('/resources', { state: { data } });
        } catch (error) {
        console.error("Ошибка при получении ресурсов:", error);
        }
    };

    const clearFilters = async () => {
        setName('');
        setHighRemand('');

        dispatch(filtersSlice.actions.setResourceName(''));
        dispatch(filtersSlice.actions.setResourcesWithHighDemand(''));

        try {
        const data = await getAllResources();
        setResources(data);
        } catch (error) {
        console.error("Ошибка загрузки ресурсов:", error);
        }

    };

    const handleStatusChange = (orbitName: string, newStatus: boolean) => {
        setResources((resources) =>
        resources.map((resource) =>
            resource.ResourceName === orbitName ? { ...resource, IsAvailable: newStatus } : resource
        )
        );
        setResources((resources) => resources.filter((resource) => resource.ResourceName !== orbitName));
    };

    return (
        <div>
            <ResourceFilter
                name={name}
                highDemand={highDemand}
                setName={setName}
                setHighDemand={setHighRemand}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
            />
            <div className="card_group">
                {resources.map((resource, index) => (
                <ResCard
                    key={index}
                    imageUrl={resource.Image}
                    resourceName={resource.ResourceName}
                    resourceStatus={resource.IsAvailable}
                    resourceDetailed={`/resources/${resource.ResourceName}`}
                    changeStatus={`/resources/change_status/${resource.ResourceName}`}
                    onStatusChange={handleStatusChange}
                />
                ))}
            </div>
        </div>
    );
};

export default HomePage;

