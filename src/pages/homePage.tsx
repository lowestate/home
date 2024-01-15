import { FC, useEffect, useState } from 'react';
import '../styles/hp-style.css';
import { Resource } from '../modules/ds';
import { getAllResources } from '../modules/get_all_resources';
import ResCard from '../components/resourceCard/ResCard';
import { useSelector } from 'react-redux';
import store, { useAppDispatch } from '../store/store';
import cartSlice from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getReportResources } from '../modules/get_report_resources';
import filtersSlice from '../store/filterSlice';
import ResourceFilter from '../components/resourceFilter/filter';
import getReportByStatus from '../modules/get_report_by_status';
import ResourceTable from '../components/resourceTable/resourceTable';

const HomePage: FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { userToken, userRole, userName } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    useSelector((state: ReturnType<typeof store.getState>) => state.cart)
    const [isStatusChanging] = useState(false);
    const { resName } = useSelector((state: ReturnType<typeof store.getState>) => state.filters);
    const [name, setName] = useState(resName);


    const { resourceWithHighDemand } = useSelector((state: ReturnType<typeof store.getState>) => state.filters);
    const [highDemand, setHighRemand] = useState(resourceWithHighDemand);

    useEffect(() => {
        const loadDraftRequest = async () => {
          const result = (await getReportByStatus(userToken?.toString(), userRole?.toString(), userName?.toString(), 'Черновик'))
          console.log("-",result)
          if (!result) {
            return
          }
          if (result[0]?.ID) {
            localStorage.setItem("reqID", result[0].ID.toString());
            const orbitsData = await getReportResources(result[0].ID, userToken?.toString());
            var resNames: string[] = [];
            if (orbitsData) {
              for (let resource of orbitsData) {
                resNames.push(resource.ResourceName);
              }
              dispatch(cartSlice.actions.setResources(resNames));
            }
          };
        }
        loadDraftRequest()
    
    
        const loadResources = async () => {
          try {
            const result = await getAllResources(name?.toString(), resourceWithHighDemand?.toString());
            setResources(result);
            console.log('Ресурсы загружены')
          } catch (error) {
            console.error("Ошибка при загрузке объектов:", error);
          }   
        }
    
        loadResources();
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

    
    const handleStatusChange = (resource_name: string, newStatus: boolean) => {
      setResources((resources) =>
      resources.map((resource) =>
          resource.ResourceName === resource_name ? { ...resource, IsAvailable: newStatus } : resource
        )
      );
      setResources((resources) => resources.filter((resource) => resource.ResourceName !== resource_name));
      navigate('/resources', { replace: true });
    }
    

    const [viewType, setViewType] = useState<'cards' | 'table'>('cards');

    const toggleViewType = () => {
        setViewType((prevType) => (prevType === 'cards' ? 'table' : 'cards'));
    };

    return (
      <div>
         {userRole === '1' && (
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="cards"
                checked={viewType === 'cards'}
                onChange={toggleViewType}
                className="radio-input"
              />
              Карточки
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="table"
                checked={viewType === 'table'}
                onChange={toggleViewType}
                className="radio-input"
              />
              Таблица
            </label>
          </div>
        )}

          <ResourceFilter
              name={name}
              highDemand={highDemand}
              setName={setName}
              setHighDemand={setHighRemand}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
          />

          <div className="card_group">
              {viewType === 'cards' &&
                  resources.map((resource, index) => (
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
      
          {userRole === '1' && viewType === 'table' && (
                <ResourceTable
                resources={resources}
                    handleStatusChange={handleStatusChange}
                    isStatusChanging={isStatusChanging}
                />
            )}
      </div>
  );
};

export default HomePage;

